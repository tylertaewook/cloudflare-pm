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
			stmt = db.prepare(
				"SELECT id, source, text, created_at FROM feedback WHERE source = ? ORDER BY created_at DESC"
			).bind(source);
		} else {
			stmt = db.prepare(
				"SELECT id, source, text, created_at FROM feedback ORDER BY created_at DESC"
			);
		}

		const result = await stmt.all();

		return NextResponse.json({
			success: true,
			feedback: result.results || [],
		});
	} catch (error) {
		console.error("Error fetching feedback:", error);
		return NextResponse.json(
			{ error: "Failed to fetch feedback", details: String(error) },
			{ status: 500 }
		);
	}
}
