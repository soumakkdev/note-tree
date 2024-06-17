'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { createClient } from './supabase/client'
import { User } from '@supabase/supabase-js'

const UserContext = createContext<User>({} as User)

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const supabase = createClient()
	const [user, setUser] = useState(null)

	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null)
		})

		return () => {
			authListener.subscription.unsubscribe()
		}
	}, [])

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export const useUser = () => {
	return useContext(UserContext)
}
