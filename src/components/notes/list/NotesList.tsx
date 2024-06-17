'use client'
import { useAtom } from 'jotai'
import { PlusCircle, Search } from 'lucide-react'
import { Input } from '../../ui/input'
import { Skeleton } from '../../ui/skeleton'
import { Tooltip } from '../../ui/tooltip'
import { useCreateNote, useNotes } from '../utils/Notes.query'
import { activeNoteAtom, useNotesFilters } from '../utils/notes.utils'
import NoteListItem from './NoteListItem'

export default function NotesList() {
	const createNoteMutation = useCreateNote()
	const [activeNote, setActiveNote] = useAtom(activeNoteAtom)
	const { data: notesList, isLoading } = useNotes()
	const { handleSearch, searchTerm } = useNotesFilters()

	function addNewNote() {
		createNoteMutation.mutate(
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

	return (
		<div className="h-full border-r w-80">
			<div className="px-5 py-3 flex items-center justify-between border-b">
				<h2 className="text-lg font-medium">All Notes</h2>
				<Tooltip content="New Note">
					<PlusCircle onClick={() => addNewNote()} className="h-5 w-5 text-primary" />
				</Tooltip>
			</div>

			{/* <div className="px-4">
				<Input
					value={searchTerm}
					onChange={(e) => handleSearch(e.target.value)}
					placeholder="Search notes"
					className="rounded-lg"
					startIcon={<Search className="h-4 w-4" />}
				/>
			</div> */}

			<div className="p-4 space-y-2">
				{isLoading ? (
					<>
						{Array.from(new Array(4).keys()).map((item) => (
							<Skeleton className="h-20 w-full rounded-xl border" key={item} />
						))}
					</>
				) : (
					<>
						{notesList?.map((note) => (
							<NoteListItem key={note.id} note={note} />
						))}
					</>
				)}
			</div>
		</div>
	)
}
