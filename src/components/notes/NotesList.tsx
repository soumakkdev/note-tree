'use client'
import { PlusCircle, Search } from 'lucide-react'
import { Input } from '../ui/input'
import { Tooltip } from '../ui/tooltip'
import NoteListItem from './NoteListItem'
import { useCreateNote, useNotes } from './Notes.query'
import { useAtom, useSetAtom } from 'jotai'
import { activeNoteAtom } from './notes.utils'
import { useHotkeys } from 'react-hotkeys-hook'

export default function NotesList() {
	const { mutate } = useCreateNote()
	const [activeNote, setActiveNote] = useAtom(activeNoteAtom)
	const { data: notesList, isLoading } = useNotes()

	function addNewNote() {
		mutate(
			{ title: 'Untitled' },
			{
				onSuccess: (data) => {
					if (data?.id) {
						setActiveNote(data.id)
					}
				},
				onError: (err) => console.log(err),
			}
		)
	}

	if (isLoading) return 'Loading'

	return (
		<div className="h-full border-r w-80">
			<div className="p-4 flex items-center justify-between">
				<h2 className="text-xl font-bold">All Notes</h2>
				<Tooltip content="New Note">
					<PlusCircle onClick={() => addNewNote()} className="h-5 w-5 text-primary" />
				</Tooltip>
			</div>
			<div className="px-4">
				<Input placeholder="Search notes" className="rounded-lg" startIcon={<Search className="h-4 w-4" />} />
			</div>

			<div className="p-4 space-y-2">
				{notesList?.items?.map((note) => (
					<NoteListItem key={note.id} note={note} />
				))}
			</div>
		</div>
	)
}
