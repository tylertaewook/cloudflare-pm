"use client";

import { useState, useEffect } from "react";
import { Feedback } from "../types";


export default function FeedbacksPage() {
	const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const [filterSource, setFilterSource] = useState<string>("All");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchFeedbacks() {
			try {
				const response = await fetch("/api/feedback");
				const data = (await response.json()) as { success: boolean; feedback: Feedback[] };
				if (data.success) {
					setFeedbacks(data.feedback);
					if (data.feedback.length > 0) {
						setSelectedId(data.feedback[0].id);
					}
				}
			} catch (error) {
				console.error("Error fetching feedback:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchFeedbacks();
	}, []);

	useEffect(() => {
		async function fetchFilteredFeedbacks() {
			try {
				const url = filterSource === "All" 
					? "/api/feedback" 
					: `/api/feedback?source=${encodeURIComponent(filterSource)}`;
				const response = await fetch(url);
				const data = (await response.json()) as { success: boolean; feedback: Feedback[] };
				if (data.success) {
					setFeedbacks(data.feedback);
					if (data.feedback.length > 0) {
						setSelectedId(data.feedback[0].id);
					} else {
						setSelectedId(null);
					}
				}
			} catch (error) {
				console.error("Error fetching filtered feedback:", error);
			}
		}

		fetchFilteredFeedbacks();
	}, [filterSource]);

	// Get unique sources from all feedbacks (we'll fetch this separately)
	const [allSources, setAllSources] = useState<string[]>(["All"]);

	useEffect(() => {
		async function fetchAllSources() {
			try {
				const response = await fetch("/api/feedback");
				const data = (await response.json()) as { success: boolean; feedback: Feedback[] };
				if (data.success) {
					const uniqueSources = new Set<string>();
					data.feedback.forEach((f: Feedback) => uniqueSources.add(f.source));
					setAllSources(["All", ...Array.from(uniqueSources).sort()]);
				}
			} catch (error) {
				console.error("Error fetching sources:", error);
			}
		}
		fetchAllSources();
	}, []);

	const selectedFeedback = feedbacks.find((f) => f.id === selectedId);

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-lg">Loading feedback...</div>
			</div>
		);
	}

	return (
		<div className="flex h-full bg-background text-foreground">
			{/* Sidebar */}
			<div className="w-80 bg-white dark:bg-[#0a0a0a] border-r border-black/[.08] dark:border-white/[.145] flex flex-col">
				<div className="p-4 border-b border-black/[.08] dark:border-white/[.145]">
					<label className="block text-sm font-medium mb-2 text-foreground">
						Filter by Source
					</label>
					<select
						className="w-full p-2 border border-black/[.08] dark:border-white/[.145] rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={filterSource}
						onChange={(e) => setFilterSource(e.target.value)}
					>
						{allSources.map((source) => (
							<option key={source} value={source}>
								{source.toUpperCase()}
							</option>
						))}
					</select>
				</div>
				<div className="overflow-y-auto flex-1">
					{feedbacks.length === 0 ? (
						<div className="p-4 text-sm text-foreground/60">
							No feedback found
						</div>
					) : (
						feedbacks.map((feedback) => (
							<button
								key={feedback.id}
								onClick={() => setSelectedId(feedback.id)}
								className={`w-full text-left p-4 border-b border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] transition-colors ${
									selectedId === feedback.id
										? "bg-blue-50 dark:bg-blue-950/20 border-r-4 border-r-blue-500"
										: ""
								}`}
							>
								<p className="font-medium text-sm mb-1 text-foreground line-clamp-2">
									{feedback.text}
								</p>
								<p className="text-xs text-foreground/60 uppercase tracking-wider">
									{feedback.source}
								</p>
							</button>
						))
					)}
				</div>
			</div>

			{/* Main Panel */}
			<div className="flex-1 p-8 overflow-y-auto">
				{selectedFeedback ? (
					<div className="max-w-3xl mx-auto">
						<div className="bg-white dark:bg-[#0a0a0a] p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] shadow-sm">
							<div className="mb-6">
								<span className="text-xs font-semibold uppercase tracking-wider text-foreground/40 mb-2 block">
									Source
								</span>
								<p className="text-lg font-medium text-blue-600 dark:text-blue-400">
									{selectedFeedback.source}
								</p>
							</div>
							<div>
								<span className="text-xs font-semibold uppercase tracking-wider text-foreground/40 mb-2 block">
									Feedback
								</span>
								<p className="text-foreground whitespace-pre-wrap leading-relaxed">
									{selectedFeedback.text}
								</p>
							</div>
							{selectedFeedback.created_at && (
								<div className="mt-6 pt-6 border-t border-black/[.08] dark:border-white/[.145]">
									<span className="text-xs font-semibold uppercase tracking-wider text-foreground/40 mb-2 block">
										Created At
									</span>
									<p className="text-sm text-foreground/60">
										{new Date(selectedFeedback.created_at).toLocaleString()}
									</p>
								</div>
							)}
						</div>
					</div>
				) : (
					<div className="max-w-3xl mx-auto">
						<div className="bg-white dark:bg-[#0a0a0a] p-6 rounded-lg border border-black/[.08] dark:border-white/[.145]">
							<p className="text-foreground/60">No feedback selected</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
