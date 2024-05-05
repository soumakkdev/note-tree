import { NotesResponse } from '@/lib/pb-types'
import { cn, formatDate } from '@/lib/utils'
import { useAtom } from 'jotai'
import { currentNoteAtom } from './notes.utils'

export default function NoteListItem({ note }: { note: NotesResponse }) {
	const [currentNote, setCurrentNote] = useAtom(currentNoteAtom)
	return (
		<div
			className={cn('p-4 border-b cursor-pointer', {
				'bg-muted': currentNote === note.id,
			})}
			onClick={() => setCurrentNote(note.id)}
		>
			<p className="font-medium">{note.title}</p>
			<p className="text-sm">Last updated on {formatDate(note.updated)}</p>
		</div>
	)
}
