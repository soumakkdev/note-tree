import { atom, useAtom } from 'jotai'
import { useDebounce } from '@uidotdev/usehooks'
import { INote, SQLNote } from '@/types/note'

export const activeNoteAtom = atom<string>('')

export const searchTermAtom = atom<string>('')

export function useNotesFilters() {
	const [searchTerm, setSearchTerm] = useAtom(searchTermAtom)

	const searchQuery = useDebounce(searchTerm, 300)

	function handleSearch(query: string) {
		setSearchTerm(query)
	}

	return { searchTerm, handleSearch, searchQuery }
}

export function formatNoteFromDB(note: SQLNote): INote {
	return {
		title: note.title,
		content: note.content,
		createdAt: note.created_at,
		updatedAt: note.updated_at,
		id: note.id.toString(),
	}
}
