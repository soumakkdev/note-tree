import { ListResponse, NotesRecord, NotesResponse } from '@/lib/pb-types'
import axios from 'axios'

export async function getNotes() {
	const res = await axios.get('/api/collections/notes/records?expand=status')
	return res.data as ListResponse<NotesResponse[]>
}

export async function getNote(noteId: string) {
	const res = await axios.get(`/api/collections/notes/records/${noteId}`)
	return res.data as NotesResponse
}

export async function updateNote(noteId: string, body: NotesRecord) {
	const res = await axios.patch(`/api/collections/notes/records/${noteId}`, body)
	return res.data as NotesResponse
}

export async function createNote(body: NotesRecord) {
	const res = await axios.post(`/api/collections/notes/records`, body)
	return res.data as NotesResponse
}

export async function deleteNote(noteId: string) {
	const res = await axios.delete(`/api/collections/notes/records/${noteId}`)
	return res.data as NotesResponse
}
