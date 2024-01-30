import { Inter } from "next/font/google"
import "./globals.css"

import NavBar from "@/components/NavBar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
	title: "Chat App - huzodev",
	description: "github.com/huzeyfeyetkiner/chat-app",
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`bg-gray-900 ${inter.className}`}>
				<NavBar />

				{children}
			</body>
		</html>
	)
}
