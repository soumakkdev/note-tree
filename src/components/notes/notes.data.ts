import { ListResponse, NotesRecord, NotesResponse } from '@/lib/pb-types'
import axios from 'axios'

export async function getNotes({ searchQuery }: { searchQuery?: string }) {
	const queryParams = new window.URLSearchParams()
	queryParams.append('expand', 'status')

	if (searchQuery) {
		queryParams.append('filter', `title ~ '${searchQuery}'`)
	}

	const res = await axios.get(`/api/collections/notes/records?${queryParams.toString()}`)
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
