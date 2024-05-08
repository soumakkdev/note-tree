import { NotesResponse } from '@/lib/pb-types'
import { cn, formatDate } from '@/lib/utils'
import { useAtom } from 'jotai'
import { activeNoteAtom } from './notes.utils'

export default function NoteListItem({ note }: { note: NotesResponse }) {
	const [activeNote, setActiveNote] = useAtom(activeNoteAtom)
	return (
		<div
			className={cn('p-4 border border-transparent cursor-pointer rounded-xl hover:border-border hover:bg-muted', {
				'!bg-primary-surface !border-primary ': activeNote === note.id,
			})}
			onClick={() => setActiveNote(note.id)}
		>
			<p className="font-semibold mb-1">{note.title}</p>
			<p className="text-xs text-muted-foreground">Last updated on {formatDate(note.updated)}</p>
		</div>
	)
}
