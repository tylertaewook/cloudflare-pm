import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(request: NextRequest) {
	try {
		// Access D1 database from Cloudflare runtime
		const ctx = getCloudflareContext();
		const db = ctx?.env?.d1_db;

		if (!db) {
			return NextResponse.json(
				{ error: "D1 database not available" },
				{ status: 500 }
			);
		}

		// Get source filter from query params
		const searchParams = request.nextUrl.searchParams;
		const source = searchParams.get("source");

		let stmt;
		if (source) {
			stmt = db.prepare(`
				SELECT 
					f.id, 
					f.source, 
					f.text, 
					f.created_at,
					fa.category,
					fa.sentiment,
					fa.urgency,
					fa.labeled_at
				FROM feedback f
				LEFT JOIN feedback_analysis fa ON f.id = fa.feedback_id
				WHERE f.source = ? 
				ORDER BY f.created_at ASC
			`).bind(source);
		} else {
			stmt = db.prepare(`
				SELECT 
					f.id, 
					f.source, 
					f.text, 
					f.created_at,
					fa.category,
					fa.sentiment,
					fa.urgency,
					fa.labeled_at
				FROM feedback f
				LEFT JOIN feedback_analysis fa ON f.id = fa.feedback_id
				ORDER BY f.created_at ASC
			`);
		}

		const result = await stmt.all();

		// Transform the results to include analysis as a nested object
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const feedbackWithAnalysis = result.results.map((row: any) => ({
			id: row.id,
			source: row.source,
			text: row.text,
			created_at: row.created_at,
			analysis: row.category ? {
				feedback_id: row.id,
				category: row.category,
				sentiment: row.sentiment,
				urgency: row.urgency,
				labeled_at: row.labeled_at,
			} : null,
		}));

		return NextResponse.json({
			success: true,
			feedback: feedbackWithAnalysis || [],
		});
	} catch (error) {
		console.error("Error fetching feedback:", error);
		return NextResponse.json(
			{ error: "Failed to fetch feedback", details: String(error) },
			{ status: 500 }
		);
	}
}
