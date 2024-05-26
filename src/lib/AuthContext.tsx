'use client'
import { IAuthContext, ILoginWithPasswordParams } from '@/types/auth'
import { ReactNode, createContext, useContext } from 'react'
import { login } from './actions/authActions'

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	async function loginWithPassword(params: ILoginWithPasswordParams) {
		return await login(params)
	}

	return <AuthContext.Provider value={{ loginWithPassword }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
