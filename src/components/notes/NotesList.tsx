import React from 'react'
import NoteListItem from './NoteListItem'

export default function NotesList() {
	return (
		<div className="h-full border-r w-80">
			<div className="p-4">
				<h2 className="text-xl font-bold">All Notes</h2>
			</div>
			<NoteListItem />
			<NoteListItem />
		</div>
	)
}
