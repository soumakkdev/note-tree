'use client'
import React from 'react'
import NoteListItem from './NoteListItem'
import { useQuery } from '@tanstack/react-query'
import { getNotes } from '@/actions/notesActions'

export default function NotesList() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['notes'],
		queryFn: getNotes,
	})

	if (isLoading) return 'Loading'
	console.log(data)

	return (
		<div className="h-full border-r w-80">
			<div className="p-4">
				<h2 className="text-xl font-bold">All Notes</h2>
			</div>
			{data?.map((note) => (
				<NoteListItem key={note.id} note={note} />
			))}
		</div>
	)
}
