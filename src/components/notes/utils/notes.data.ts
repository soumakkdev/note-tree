import { createClient } from '@/lib/supabase/client'
import { INote, IUpdateNote } from '@/types/note'
import { formatNoteFromDB } from './notes.utils'

export async function getNotes({ searchQuery }: { searchQuery?: string }) {
	// const queryParams = new window.URLSearchParams()
	// queryParams.append('expand', 'status')

	// if (searchQuery) {
	// 	queryParams.append('filter', `title ~ '${searchQuery}'`)
	// }

	const supabase = createClient()
	const {
		data: { user },
		error: userError,
	} = await supabase?.auth?.getUser()
	if (userError) {
		throw new Error(userError.message)
	}

	let { data, error } = await supabase.from('notes').select('*')
	if (error) {
		throw new Error(error.message)
	}

	const notes = data?.map((note) => formatNoteFromDB(note))
	return notes as INote[]
}

export async function getNote(noteId: string) {
	const supabase = createClient()
	const { data, error } = await supabase.from('notes').select('*').eq('id', noteId)

	if (error) {
		throw new Error(error.message)
	}

	return formatNoteFromDB(data[0])
}

export async function updateNote(noteId: string, body: IUpdateNote) {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase?.auth?.getUser()

	const { data, error } = await supabase
		.from('notes')
		.update({ ...body, user_id: user?.id })
		.eq('id', noteId)
		.select()

	if (error) {
		throw new Error(error.message)
	}

	return formatNoteFromDB(data[0])
}

export async function createNote(body: IUpdateNote) {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase?.auth?.getUser()

	const { data, error } = await supabase
		.from('notes')
		.insert({ ...body, user_id: user?.id })
		.select()

	if (error) {
		throw new Error(error.message)
	}

	return formatNoteFromDB(data[0])
}

export async function deleteNote(noteId: string) {
	const supabase = createClient()
	const { error } = await supabase.from('notes').delete().eq('id', noteId)

	if (error) {
		throw new Error(error.message)
	}

	return
}
