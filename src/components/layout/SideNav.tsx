'use server'
import { Notebook, Star, Trash2 } from 'lucide-react'
import React from 'react'

export default async function SideNav() {
	return (
		<div className="w-16 border-r h-full flex flex-col items-center gap-5 py-5">
			<Notebook />
			<Star />
			<Trash2 />
		</div>
	)
}
