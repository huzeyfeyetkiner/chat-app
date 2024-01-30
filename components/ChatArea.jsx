"use client"

import React, { useEffect, useState, useRef } from "react"
import app from "@/app/firebase"
import {
	collection,
	addDoc,
	getFirestore,
	onSnapshot,
	serverTimestamp,
	orderBy,
	query,
	limit,
} from "firebase/firestore"

import { getAuth } from "firebase/auth"
import ChatMessage from "./ChatMessage"

function ChatArea() {
	const auth = getAuth(app)
	const db = getFirestore(app)

	const [message, setMessage] = useState("")
	const [messages, setMessages] = useState([])

	const messagesEndRef = useRef(null)

	const sendMessage = async (e) => {
		e.preventDefault()

		const { uid, photoURL } = auth.currentUser

		// sending messages to firebase unless the message is empty
		if (!message) return
		const messagesRef = await addDoc(collection(db, "messages"), {
			message: message,
			createdAt: serverTimestamp(),
			uid,
			photoURL,
		})
		setMessage("")
	}

	// Listening new messages from firebase inside useEffect
	useEffect(() => {
		// Querying the messages by sending date, and limiting to 25 messages
		const q = query(
			collection(db, "messages"),
			orderBy("createdAt"),
			limit(25)
		)
		const unsubscribe = onSnapshot(
			q,

			(snapshot) => {
				setMessages(
					snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
				)
			}
		)

		return () => unsubscribe() // Detach the listener when the component unmounts
	}, [db])

	// Scroll to bottom of the chat area when new message is sent
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}, [messages])

	return (
		<div className="w-full flex flex-col items-center justify-center gap-y-2">
			<p className="text-4xl text-white font-medium mb-4">
				Merhaba {auth?.currentUser?.displayName}
			</p>
			<div className="min-w-96 w-2/3 h-96 bg-white rounded-lg p-12  overflow-scroll overflow-y-auto mx-auto">
				{messages &&
					messages.map((msg) => {
						return <ChatMessage key={msg.id} message={msg} />
					})}
				<div ref={messagesEndRef} />
			</div>

			<form
				className="min-w-96 w-2/3 flex justify-between mx-auto"
				onSubmit={sendMessage}
			>
				<input
					className="w-4/5 p-2 rounded-md shadow-sm shadow-white outline-none"
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button
					className="w-1/6 bg-white text-black px-4 rounded-md shadow-sm shadow-white hover:bg-slate-200"
					type="submit"
				>
					Send
				</button>
			</form>
		</div>
	)
}

export default ChatArea
