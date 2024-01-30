"use client"

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export default function Home() {
	const { user } = useAuth()
	const router = useRouter()

	if (user !== null) {
		router.push("/chat")
	}

	return (
		<main className="flex flex-col items-center justify-between p-12 ">
			<p className="text-white">
				Chat Application - In Order to Use It, You Need To Login
			</p>
		</main>
	)
}
