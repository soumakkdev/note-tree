export interface ILoginWithPasswordParams {
	email: string
	password: string
}

export interface IAuthContext {
	loginWithPassword: (params: ILoginWithPasswordParams) => void
}
