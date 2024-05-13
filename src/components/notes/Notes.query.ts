import { NotesRecord } from '@/lib/pb-types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { createNote, deleteNote, getNote, getNotes, updateNote } from './notes.data'
import { activeNoteAtom, useNotesFilters } from './notes.utils'

export function useNotes() {
	const { searchQuery } = useNotesFilters()
	return useQuery({
		queryKey: ['notes', searchQuery],
		queryFn: () => getNotes({ searchQuery }),
	})
}

export function useNote(noteId: string) {
	return useQuery({
		queryFn: () => getNote(noteId),
		queryKey: ['notes', noteId],
		enabled: !!noteId,
	})
}

export function useUpdateNote(noteId: string) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (body: NotesRecord) => updateNote(noteId, body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['notes'] })
		},
	})
}

export function useCreateNote() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (body: NotesRecord) => createNote(body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['notes'] })
		},
	})
}

export function useDeleteNote() {
	const queryClient = useQueryClient()
	const setActiveNote = useSetAtom(activeNoteAtom)
	return useMutation({
		mutationFn: (noteId: string) => deleteNote(noteId),
		onSuccess: () => {
			setActiveNote(null)
			queryClient.invalidateQueries({ queryKey: ['notes'] })
		},
	})
}
