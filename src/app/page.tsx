"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartConfig,
} from "@/components/ui/chart";
import { FeedbackStats } from "./types";

export default function Home() {
	const [stats, setStats] = useState<FeedbackStats | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchStats() {
			try {
				const response = await fetch("/api/stats");
				const data = (await response.json()) as FeedbackStats;
				if (data.success) {
					setStats(data);
				}
			} catch (error) {
				console.error("Error fetching stats:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchStats();
	}, []);

	const sourceConfig: ChartConfig = {
		count: {
			label: "Feedback Count",
			color: "hsl(var(--chart-1))",
		},
	};

	const categoryConfig: ChartConfig = {
		count: {
			label: "Feedback Count",
			color: "hsl(var(--chart-1))",
		},
	};

	const sentimentConfig: ChartConfig = {
		positive: {
			label: "Positive",
			color: "hsl(142, 76%, 36%)",
		},
		neutral: {
			label: "Neutral",
			color: "hsl(0, 0%, 60%)",
		},
		negative: {
			label: "Negative",
			color: "hsl(0, 84%, 60%)",
		},
	};

	const urgencyConfig: ChartConfig = {
		high: {
			label: "High",
			color: "hsl(0, 84%, 60%)",
		},
		medium: {
			label: "Medium",
			color: "hsl(48, 96%, 53%)",
		},
		low: {
			label: "Low",
			color: "hsl(142, 76%, 36%)",
		},
	};

	const sentimentData = stats?.sentiments.map((item) => ({
		...item,
		fill:
			item.name === "positive"
				? "hsl(142, 76%, 36%)"
				: item.name === "negative"
					? "hsl(0, 84%, 60%)"
					: "hsl(0, 0%, 60%)",
	}));

	const urgencyData = stats?.urgencies.map((item) => ({
		...item,
		fill:
			item.name === "high"
				? "hsl(0, 84%, 60%)"
				: item.name === "medium"
					? "hsl(48, 96%, 53%)"
					: "hsl(142, 76%, 36%)",
	}));

	if (loading) {
		return (
			<div className="flex items-center justify-center h-full">
				<div className="text-lg">Loading dashboard...</div>
			</div>
		);
	}

	return (
		<div className="h-full overflow-y-auto bg-background">
			<div className="max-w-7xl mx-auto px-8 py-12">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-4xl font-bold mb-2">Feedback Analytics</h1>
					<p className="text-lg text-muted-foreground">
						Overview of feedback trends and distribution
					</p>
				</div>

				{/* Charts Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					{/* Source Distribution */}
					<Card>
						<CardHeader>
							<CardTitle>Source Distribution</CardTitle>
							<CardDescription>
								Feedback count by source channel
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ChartContainer config={sourceConfig} className="h-[300px] w-full">
								<BarChart data={stats?.sources || []} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
									<CartesianGrid strokeDasharray="3 3" vertical={false} />
									<XAxis
										dataKey="name"
										tickLine={false}
										axisLine={false}
										tickMargin={8}
									/>
									<YAxis
										tickLine={false}
										axisLine={false}
										tickMargin={8}
									/>
									<ChartTooltip content={<ChartTooltipContent />} />
									<Bar
										dataKey="count"
										fill="hsl(var(--chart-1))"
										radius={[4, 4, 0, 0]}
									/>
								</BarChart>
							</ChartContainer>
						</CardContent>
					</Card>

					{/* Category Distribution */}
					<Card>
						<CardHeader>
							<CardTitle>Category Distribution</CardTitle>
							<CardDescription>
								Feedback count by product category
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ChartContainer config={categoryConfig} className="h-[300px] w-full">
								<BarChart data={stats?.categories || []} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
									<CartesianGrid strokeDasharray="3 3" vertical={false} />
									<XAxis
										dataKey="name"
										tickLine={false}
										axisLine={false}
										tickMargin={8}
										angle={-45}
										textAnchor="end"
										height={80}
									/>
									<YAxis
										tickLine={false}
										axisLine={false}
										tickMargin={8}
									/>
									<ChartTooltip content={<ChartTooltipContent />} />
									<Bar
										dataKey="count"
										fill="hsl(var(--chart-1))"
										radius={[4, 4, 0, 0]}
									/>
								</BarChart>
							</ChartContainer>
						</CardContent>
					</Card>

					{/* Sentiment Distribution */}
					<Card>
						<CardHeader>
							<CardTitle>Sentiment Analysis</CardTitle>
							<CardDescription>
								Feedback distribution by sentiment
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ChartContainer config={sentimentConfig} className="h-[300px] w-full">
								<BarChart data={sentimentData || []} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
									<CartesianGrid strokeDasharray="3 3" vertical={false} />
									<XAxis
										dataKey="name"
										tickLine={false}
										axisLine={false}
										tickMargin={8}
									/>
									<YAxis
										tickLine={false}
										axisLine={false}
										tickMargin={8}
									/>
									<ChartTooltip content={<ChartTooltipContent />} />
									<Bar
										dataKey="count"
										radius={[4, 4, 0, 0]}
									/>
								</BarChart>
							</ChartContainer>
						</CardContent>
					</Card>

					{/* Urgency Distribution */}
					<Card>
						<CardHeader>
							<CardTitle>Urgency Levels</CardTitle>
							<CardDescription>
								Feedback distribution by urgency
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ChartContainer config={urgencyConfig} className="h-[300px] w-full">
								<BarChart data={urgencyData || []} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
									<CartesianGrid strokeDasharray="3 3" vertical={false} />
									<XAxis
										dataKey="name"
										tickLine={false}
										axisLine={false}
										tickMargin={8}
									/>
									<YAxis
										tickLine={false}
										axisLine={false}
										tickMargin={8}
									/>
									<ChartTooltip content={<ChartTooltipContent />} />
									<Bar
										dataKey="count"
										radius={[4, 4, 0, 0]}
									/>
								</BarChart>
							</ChartContainer>
						</CardContent>
					</Card>
				</div>

				{/* Call to Action */}
				<div className="flex justify-center">
					<Link
						href="/feedbacks"
						className="inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors"
					>
						View All Feedbacks
					</Link>
				</div>
			</div>
		</div>
	);
}
