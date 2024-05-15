import React, { useState } from 'react'
import { Input } from '../ui/input'
import { activeNoteAtom } from './notes.utils'
import { useAtom } from 'jotai'
import { useUpdateNote } from './Notes.query'

export default function NoteTitle({ title }: { title: string }) {
	const [text, setText] = useState(title)
	const [activeNote, setActiveNote] = useAtom(activeNoteAtom)
	const { mutate: updateNote, isPending } = useUpdateNote(activeNote)

	function handleBlur() {
		if (text !== title) {
			updateNote(
				{ title: text },
				{
					onError: (err) => {
						console.log(err)
					},
				}
			)
		}
	}

	return (
		<div>
			<Input onBlur={handleBlur} value={text} onChange={(e) => setText(e.target.value)} className="text-xl font-bold outline-none border-0" />
			{/* <h1 className="text-xl font-bold">{title}</h1> */}
		</div>
	)
}
