'use server'

import pb from '@/lib/pb'
import { NotesResponse } from '@/lib/pb-types'

export async function getNotes() {
	return await pb.collection<NotesResponse>('notes').getFullList()
}
