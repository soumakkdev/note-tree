'use client'
import { useAtom, useAtomValue } from 'jotai'
import { Star, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { Tooltip } from '../ui/tooltip'
import NoteEditor from './NoteEditor'
import { useDeleteNote, useNote, useUpdateNote } from './Notes.query'
import { activeNoteAtom } from './notes.utils'
import Modal from '../widgets/Modal'
import { Button } from '../ui/button'

export default function NoteContent() {
	const [activeNote, setActiveNote] = useAtom(activeNoteAtom)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

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
		deleteNote(noteId, {
			onSuccess: () => {
				setIsDeleteModalOpen(false)
			},
		})
	}

	useHotkeys('mod+s', () => updateNoteContent(), {
		preventDefault: true,
		enableOnContentEditable: true,
	})

	if (!activeNote) {
		return (
			<div className="flex-1 grid place-content-center">
				<div className="flex flex-col items-center justify-center">
					<p className="text-xl font-medium text-muted-foreground">No note is open</p>
					<Button variant="link">Create new (Ctrl + N)</Button>
				</div>
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
					{/* <Tooltip content="Mark as important">
						<Star className="h-5 w-5 text-yellow-500" />
					</Tooltip> */}
					<Tooltip content="Move to trash">
						<Trash2 className="h-5 w-5 text-red-500" onClick={() => setIsDeleteModalOpen(true)} />
					</Tooltip>
				</div>
			</div>
			<div className="max-w-4xl mx-auto my-6">
				<NoteEditor initialValue={data?.content} onChange={(data) => setHtml(data)} />
			</div>

			<Modal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
				<Modal.Header title="Delete Modal" />
				<p>Are you sure to delete this note?</p>
				<Modal.Footer>
					<Button variant="secondary">Cancel</Button>
					<Button variant="default" onClick={() => handleDeleteNote(activeNote)}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}
