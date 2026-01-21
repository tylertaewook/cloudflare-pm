"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();

	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<div className="flex flex-col h-screen">
					{/* Header Navbar */}
					<header className="bg-white dark:bg-[#0a0a0a] border-b border-black/[.08] dark:border-white/[.145]">
						<nav className="flex items-center px-6 h-14">
							<div className="flex items-center gap-8">
								<Link 
									href="/" 
									className="text-lg font-semibold text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
								>
									Cloudflare PM
								</Link>
								<div className="flex items-center gap-4">
									<Link 
										href="/" 
										className={`text-sm font-medium transition-colors ${
											pathname === "/" 
												? "text-blue-600 dark:text-blue-400" 
												: "text-foreground/60 hover:text-foreground"
										}`}
									>
										Home
									</Link>
									<Link 
										href="/feedbacks" 
										className={`text-sm font-medium transition-colors ${
											pathname === "/feedbacks" 
												? "text-blue-600 dark:text-blue-400" 
												: "text-foreground/60 hover:text-foreground"
										}`}
									>
										Feedbacks
									</Link>
								</div>
							</div>
						</nav>
					</header>
					{/* Main Content */}
					<main className="flex-1 overflow-hidden">
						{children}
					</main>
				</div>
			</body>
		</html>
	);
}
