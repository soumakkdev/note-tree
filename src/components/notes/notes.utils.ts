import { atom, useAtom } from 'jotai'
import { useDebounce } from '@uidotdev/usehooks'

export const activeNoteAtom = atom<string | null>(null)

export const searchTermAtom = atom<string>('')

export function useNotesFilters() {
	const [searchTerm, setSearchTerm] = useAtom(searchTermAtom)

	const searchQuery = useDebounce(searchTerm, 300)

	function handleSearch(query: string) {
		setSearchTerm(query)
	}

	return { searchTerm, handleSearch, searchQuery }
}
