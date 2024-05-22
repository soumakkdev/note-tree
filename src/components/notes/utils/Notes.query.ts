import { ListResponse, NotesRecord, NotesResponse } from '@/lib/pb-types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { createNote, deleteNote, getNote, getNotes, updateNote } from './notes.data'
import { activeNoteAtom, useNotesFilters } from './notes.utils'
import { produce } from 'immer'
import { isEmpty } from 'radash'

export function useNotes() {
	const { searchQuery } = useNotesFilters()
	return useQuery({
		queryKey: ['notes', isEmpty(searchQuery) ? 'all' : searchQuery],
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
		onSuccess: (data) => {
			queryClient.setQueryData(['notes', 'all'], (prev: ListResponse<NotesResponse[]>) => {
				return produce(prev, (draft) => {
					const idx = draft.items.findIndex((note) => note.id === noteId)
					draft.items.splice(idx, 1, data)
				})
			})
		},
	})
}

export function useCreateNote() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (body: NotesRecord) => createNote(body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['notes', 'all'] })
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
			queryClient.invalidateQueries({ queryKey: ['notes', 'all'] })
		},
	})
}
