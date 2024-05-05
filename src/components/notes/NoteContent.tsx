'use client'
import React from 'react'
import NoteEditor from './NoteEditor'
import { Eye, PanelLeft, Star, Trash2 } from 'lucide-react'
import { useAtomValue } from 'jotai'
import { currentNoteAtom } from './notes.utils'
import { useQuery } from '@tanstack/react-query'
import { getNote } from '@/actions/notesActions'

export default function NoteContent() {
	const currentNote = useAtomValue(currentNoteAtom)

	const { data, isLoading } = useQuery({
		queryFn: () => getNote(currentNote),
		queryKey: ['notes', currentNote],
		enabled: !!currentNote,
	})

	if (!currentNote) {
		return (
			<div className="flex-1">
				<p>No Notes are selected</p>
			</div>
		)
	}

	if (isLoading) {
		return <p>Loading...</p>
	}

	return (
		<div className="flex-1 overflow-auto relative">
			<div className="flex justify-between p-4 sticky top-0 z-10 bg-white">
				<PanelLeft />

				<div className="flex items-center space-x-4">
					<Eye />
					<Star />
					<Trash2 />
				</div>
			</div>
			<NoteEditor initialValue={data?.content} />
		</div>
	)
}
