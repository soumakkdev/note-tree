'use client'
import { getNote } from '@/actions/notesActions'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { Star, Trash2 } from 'lucide-react'
import { Tooltip } from '../ui/tooltip'
import NoteEditor from './NoteEditor'
import { currentNoteAtom } from './notes.utils'

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
			<div className="flex justify-between p-4 sticky top-0 z-10 bg-white border-b">
				<h1 className="text-xl font-bold">{data?.title}</h1>
				<div className="flex items-center space-x-4">
					<Tooltip content="Mark as important">
						<Star className="h-5 w-5 text-yellow-500" />
					</Tooltip>
					<Tooltip content="Move to trash">
						<Trash2 className="h-5 w-5 text-red-500" />
					</Tooltip>
				</div>
			</div>
			<div className="max-w-4xl mx-auto my-6">
				<NoteEditor initialValue={data?.content} />
			</div>
		</div>
	)
}
