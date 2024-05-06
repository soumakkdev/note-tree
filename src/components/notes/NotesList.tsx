'use client'
import React from 'react'
import NoteListItem from './NoteListItem'
import { useQuery } from '@tanstack/react-query'
import { getNotes } from '@/actions/notesActions'
import { PlusCircle, Search } from 'lucide-react'
import { Tooltip } from '../ui/tooltip'
import { Input } from '../ui/input'

export default function NotesList() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['notes'],
		queryFn: getNotes,
	})

	if (isLoading) return 'Loading'
	// console.log(data)

	return (
		<div className="h-full border-r w-80">
			<div className="p-4 flex items-center justify-between">
				<h2 className="text-xl font-bold">All Notes</h2>
				<Tooltip content="New Note">
					<PlusCircle className="h-5 w-5 text-primary" />
				</Tooltip>
			</div>
			<div className="px-4">
				<Input placeholder="Search notes" className="rounded-lg" startIcon={<Search className="h-4 w-4" />} />
			</div>

			<div className="p-4 space-y-2">
				{data?.map((note) => (
					<NoteListItem key={note.id} note={note} />
				))}
			</div>
		</div>
	)
}
