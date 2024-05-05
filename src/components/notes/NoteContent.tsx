import React from 'react'
import NoteEditor from './NoteEditor'
import { Eye, PanelLeft, Star, Trash2 } from 'lucide-react'

export default function NoteContent() {
	return (
		<div className="flex-1 overflow-auto relative">
			<div className="flex justify-between p-4 sticky top-0 z-10 bg-white">
				<PanelLeft />

				<div className="flex items-center space-x-4">
					<Eye />
					<Star />
					<Trash2 />
				</div>
			</div>
			<NoteEditor />
		</div>
	)
}
