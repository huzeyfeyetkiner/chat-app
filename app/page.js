import { initializeApp } from "firebase/app"

export default function Home() {
	const firebaseConfig = {
		apiKey: "AIzaSyAUR5NKvQEvxEW-qQSaPPRp1X-EFH68MFU",
		authDomain: "chat-app-9831c.firebaseapp.com",
		projectId: "chat-app-9831c",
		storageBucket: "chat-app-9831c.appspot.com",
		messagingSenderId: "359463469120",
		appId: "1:359463469120:web:920e8f601aba091bbedfa5",
		measurementId: "G-VJM71YF7W0",
	}

	// Initialize Firebase
	const app = initializeApp(firebaseConfig)

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<p className="text-white">Deneme</p>
		</main>
	)
}
