'use client'
import { useAtom } from 'jotai'
import { Check, Loader2 } from 'lucide-react'
import { isEqual } from 'radash'
import { useEffect, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import Loader from '../../ui/loader'
import { useNote, useUpdateNote } from '../utils/Notes.query'
import { activeNoteAtom } from '../utils/notes.utils'
import NoteEditor from './NoteEditor'
import NoteTitle from './NoteTitle'

export default function NoteContent() {
	const [activeNote, setActiveNote] = useAtom(activeNoteAtom)

	const { mutate: updateNote, isPending, isSuccess } = useUpdateNote(activeNote)
	const { data, isLoading: isNoteLoading, isFetching: isNoteFetching } = useNote(activeNote)
	const [html, setHtml] = useState(data?.content)

	const intervalRef = useRef(null)
	const initialContent = useRef(html)

	useEffect(() => {
		intervalRef.current = setInterval(() => {
			if (!isEqual(initialContent.current, html)) {
				updateNoteContent()
				initialContent.current = html
			}
		}, 5000)

		return () => {
			clearInterval(intervalRef.current)
		}
	}, [html])

	function updateNoteContent() {
		console.log('saving...')
		updateNote(
			{ content: html },
			{
				onError: (err) => {
					console.log(err)
				},
			}
		)
	}

	function updateNoteTitle(title: string) {
		updateNote(
			{ title },
			{
				onError: (err) => {
					console.log(err)
				},
			}
		)
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
					{/* <Button variant="link">Create new (Ctrl + N)</Button> */}
				</div>
			</div>
		)
	}

	if (isNoteLoading) {
		return (
			<div className="flex-1 h-full w-full grid place-content-center">
				<Loader className="h-8 w-8" />
			</div>
		)
	}

	return (
		<div className="flex-1 overflow-auto relative">
			<div className="flex justify-between px-4 py-2 sticky top-0 z-50 bg-background border-b">
				<NoteTitle title={data?.title} onTitleIUpdate={updateNoteTitle} />

				<div className="flex items-center space-x-4">
					{isSuccess ? (
						<div className="flex items-center gap-1 text-sm font-medium text-green-500">
							<Check className="h-4 w-4 " /> Saved
						</div>
					) : null}
					{isPending ? (
						<div className="text-sm font-medium flex items-center gap-1 text-muted-foreground">
							<Loader2 className="h-4 w-4 animate-spin" />
							Saving...
						</div>
					) : null}
				</div>
			</div>
			<div className="max-w-4xl mx-auto my-6">
				<NoteEditor initialValue={data?.content} onChange={(data) => setHtml(data)} />
			</div>
		</div>
	)
}
