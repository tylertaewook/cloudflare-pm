import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET() {
	try {
		const ctx = getCloudflareContext();
		const db = ctx?.env?.d1_db;

		if (!db) {
			return NextResponse.json(
				{ error: "D1 database not available" },
				{ status: 500 }
			);
		}

		// Query source distribution
		const sourcesResult = await db.prepare(`
			SELECT source as name, COUNT(*) as count
			FROM feedback
			GROUP BY source
			ORDER BY count DESC
		`).all();

		// Query category distribution
		const categoriesResult = await db.prepare(`
			SELECT category as name, COUNT(*) as count
			FROM feedback_analysis
			GROUP BY category
			ORDER BY count DESC
		`).all();

		// Query sentiment distribution
		const sentimentsResult = await db.prepare(`
			SELECT sentiment as name, COUNT(*) as count
			FROM feedback_analysis
			GROUP BY sentiment
			ORDER BY 
				CASE sentiment
					WHEN 'positive' THEN 1
					WHEN 'neutral' THEN 2
					WHEN 'negative' THEN 3
				END
		`).all();

		// Query urgency distribution
		const urgenciesResult = await db.prepare(`
			SELECT urgency as name, COUNT(*) as count
			FROM feedback_analysis
			GROUP BY urgency
			ORDER BY 
				CASE urgency
					WHEN 'high' THEN 1
					WHEN 'medium' THEN 2
					WHEN 'low' THEN 3
				END
		`).all();

		return NextResponse.json({
			success: true,
			sources: sourcesResult.results || [],
			categories: categoriesResult.results || [],
			sentiments: sentimentsResult.results || [],
			urgencies: urgenciesResult.results || [],
		});
	} catch (error) {
		console.error("Error fetching stats:", error);
		return NextResponse.json(
			{ error: "Failed to fetch stats", details: String(error) },
			{ status: 500 }
		);
	}
}
