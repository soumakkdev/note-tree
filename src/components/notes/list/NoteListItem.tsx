import { NotesResponse } from '@/lib/pb-types'
import { cn, formatDate } from '@/lib/utils'
import { useAtom } from 'jotai'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '../../ui/context-menu'
import { activeNoteAtom } from '../utils/notes.utils'
import { Trash2 } from 'lucide-react'
import Modal from '../../widgets/Modal'
import { useDeleteNote } from '../utils/Notes.query'
import { useState } from 'react'
import { Button } from '../../ui/button'

export default function NoteListItem({ note }: { note: NotesResponse }) {
	const [activeNote, setActiveNote] = useAtom(activeNoteAtom)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const { mutate: deleteNote } = useDeleteNote()

	function handleDeleteNote(noteId: string) {
		deleteNote(noteId, {
			onSuccess: () => {
				setIsDeleteModalOpen(false)
			},
		})
	}

	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<div
					className={cn('p-4 border border-transparent cursor-pointer rounded-xl hover:border-border hover:bg-muted', {
						'!bg-primary-surface !border-primary ': activeNote === note.id,
					})}
					onClick={() => setActiveNote(note.id)}
				>
					<p className="font-semibold mb-1">{note.title}</p>
					<p className="text-xs text-muted-foreground">Last updated on {formatDate(note.updated)}</p>
				</div>
			</ContextMenuTrigger>
			<ContextMenuContent className="">
				<ContextMenuItem onClick={() => setIsDeleteModalOpen(true)}>
					<Trash2 className="mr-2 h-4 w-4 text-red-500" />
					Delete
				</ContextMenuItem>
			</ContextMenuContent>

			<Modal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
				<Modal.Header title="Delete Modal" />
				<p>Are you sure to delete this note?</p>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
						Cancel
					</Button>
					<Button variant="default" onClick={() => handleDeleteNote(activeNote)}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</ContextMenu>
	)
}
