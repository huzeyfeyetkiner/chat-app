import Image from "next/image"
import React from "react"
import { getAuth } from "firebase/auth"
import app from "@/app/firebase"

function ChatMessage({ message }) {
	const { uid, photoURL } = message
	const auth = getAuth(app)

	return (
		<div
			className={`w-fit max-w-96 flex flex-row items-center justify-evenly my-2 bg-yellow-100 p-4 rounded-xl gap-x-3 ${
				auth.currentUser.uid == uid && "flex-row-reverse ml-auto"
			}`}
		>
			<Image
				width={48}
				height={48}
				className="rounded-full"
				src={photoURL}
				alt={"profile picture"}
			/>
			<p className="w-3/4 text-black break-words">{message.message}</p>
		</div>
	)
}

export default ChatMessage
