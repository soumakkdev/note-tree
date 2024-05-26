import pb from '@/lib/pb'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { email, password } = await request.json()
		const result = await pb.collection('users').authWithPassword(email, password)
		if (!result.token) {
			throw new Error('Incorrect email or password')
		}
		const { record, token } = result
		record.token = token
		cookies().set('pb_auth', pb.authStore.exportToCookie(), { httpOnly: true })
		return NextResponse.json(record)
	} catch (err: any) {
		return new Response(JSON.stringify({ error: err.message ?? 'Failed to login' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}
}
