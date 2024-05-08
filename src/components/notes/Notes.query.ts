import { NotesRecord } from '@/lib/pb-types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { createNote, deleteNote, getNote, getNotes, updateNote } from './notes.data'
import { activeNoteAtom } from './notes.utils'

export function useNotes() {
	return useQuery({
		queryKey: ['notes'],
		queryFn: getNotes,
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
	return useMutation({
		mutationFn: (body: NotesRecord) => updateNote(noteId, body),
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
