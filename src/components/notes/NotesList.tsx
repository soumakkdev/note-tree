import React from 'react'
import NoteListItem from './NoteListItem'

export default function NotesList() {
	return (
		<div className="h-full border-r w-80">
			<NoteListItem />
			<NoteListItem />
		</div>
	)
}
