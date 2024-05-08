'use client'
import { useAtom, useAtomValue } from 'jotai'
import { Star, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { Tooltip } from '../ui/tooltip'
import NoteEditor from './NoteEditor'
import { useDeleteNote, useNote, useUpdateNote } from './Notes.query'
import { activeNoteAtom } from './notes.utils'

export default function NoteContent() {
	const [activeNote, setActiveNote] = useAtom(activeNoteAtom)

	const { mutate: updateNote, isPending } = useUpdateNote(activeNote)
	const { mutate: deleteNote } = useDeleteNote()
	const { data, isLoading: isNoteLoading } = useNote(activeNote)
	const [html, setHtml] = useState(data?.content)

	function updateNoteContent() {
		updateNote(
			{ content: html },
			{
				onError: (err) => {
					console.log(err)
				},
			}
		)
	}

	function handleDeleteNote(noteId: string) {
		deleteNote(noteId)
	}

	useHotkeys('mod+s', () => updateNoteContent(), {
		preventDefault: true,
		enableOnContentEditable: true,
	})

	if (!activeNote) {
		return (
			<div className="flex-1">
				<p>No Notes are selected</p>
			</div>
		)
	}

	if (isNoteLoading) {
		return <p>Loading...</p>
	}

	return (
		<div className="flex-1 overflow-auto relative">
			<div className="flex justify-between p-4 sticky top-0 z-10 bg-white border-b">
				<h1 className="text-xl font-bold">{data?.title}</h1>
				<div className="flex items-center space-x-4">
					{isPending ? <div>Saving...</div> : null}
					<Tooltip content="Mark as important">
						<Star className="h-5 w-5 text-yellow-500" />
					</Tooltip>
					<Tooltip content="Move to trash">
						<Trash2 className="h-5 w-5 text-red-500" onClick={() => handleDeleteNote(activeNote)} />
					</Tooltip>
				</div>
			</div>
			<div className="max-w-4xl mx-auto my-6">
				<NoteEditor initialValue={data?.content} onChange={(data) => setHtml(data)} />
			</div>
		</div>
	)
}
