"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"

import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signOut,
} from "firebase/auth"

import app from "../app/firebase"

function NavBar() {
	const [user, setUser] = useState(null)
	const provider = new GoogleAuthProvider()
	const auth = getAuth(app)
	const router = useRouter()

	const signInWithGoogle = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential =
					GoogleAuthProvider.credentialFromResult(result)
				const token = credential.accessToken
				// The signed-in user info.
				const user = result.user
				setUser(user)
				router.push("/chat")
				console.log(result)
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code
				const errorMessage = error.message
				// The email of the user's account used.
				const email = error.customData.email
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error)
				// ...

				console.log(error)
			})
	}

	return (
		<div className="w-full flex flex-row justify-center items-center bg-[#363636] py-4 gap-y-2">
			{user ? (
				<div className="flex flex-col items-center">
					<h1 className="text-white">
						Logged in as {user.displayName}
					</h1>
					<button
						className="bg-white text-[#363636] p-2 rounded-md shadow-sm shadow-white hover:bg-slate-200"
						onClick={() => {
							signOut(auth)
								.then(() => {
									console.log("Sign-out successful.")
									setUser(null)
									router.push("/")
								})
								.catch((error) => {
									console.log("An error happened.")
								})
						}}
					>
						Logout
					</button>
				</div>
			) : (
				<button
					className="bg-white text-[#363636] p-2 rounded-md shadow-sm shadow-white hover:bg-slate-200"
					onClick={signInWithGoogle}
				>
					Login with Google
				</button>
			)}
		</div>
	)
}

export default NavBar
