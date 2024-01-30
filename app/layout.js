import { Inter } from "next/font/google"
import "./globals.css"

import NavBar from "@/components/NavBar"
import { AuthProvider } from "@/context/AuthContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
	title: "Chat App - huzodev",
	description: "github.com/huzeyfeyetkiner/chat-app",
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`bg-gray-900 ${inter.className}`}>
				<AuthProvider>
					<NavBar />

					{children}
				</AuthProvider>
			</body>
		</html>
	)
}
