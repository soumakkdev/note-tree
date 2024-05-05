import { NotesResponse } from '@/lib/pb-types'
import { formatDate } from '@/lib/utils'

export default function NoteListItem({ note }: { note: NotesResponse }) {
	return (
		<div className="p-4 border-b">
			<p className="font-medium">{note.title}</p>
			<p className="text-sm">Last updated on {formatDate(note.updated)}</p>
		</div>
	)
}
