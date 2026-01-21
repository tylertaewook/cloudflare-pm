"use client";

import Link from "next/link";

export default function Home() {
	return (
		<div className="flex h-full bg-background text-foreground items-center justify-center">
			<div className="max-w-3xl mx-auto px-8 text-center">
				<h1 className="text-4xl font-bold mb-4 text-foreground">
					Welcome to Cloudflare PM
				</h1>
				<p className="text-lg text-foreground/60 mb-8">
					Manage and analyze product feedback efficiently
				</p>
				<Link
					href="/feedbacks"
					className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
				>
					View Feedbacks
				</Link>
			</div>
		</div>
	);
}
