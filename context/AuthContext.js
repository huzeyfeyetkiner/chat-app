"use client"
import React, { useContext, createContext, useState } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	const values = {
		user,
		setUser,
	}

	return (
		<AuthContext.Provider value={values}>{children}</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
