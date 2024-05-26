'use server'

import pb from '@/lib/pb'
import { ILoginWithPasswordParams } from '@/types/auth'
import { cookies } from 'next/headers'

export async function login(props: ILoginWithPasswordParams) {
	const result = await pb.collection('users').authWithPassword(props.email, props.password)
	if (!result.token) {
		throw new Error('Incorrect email or password')
	}

	// set next cookie
	cookies().set('pb_auth', pb.authStore.exportToCookie(), { httpOnly: true })
	return result
}
