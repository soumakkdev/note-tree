'use client'
import { Notebook, Star, Trash2 } from 'lucide-react'
import React from 'react'
import NavButton from './NavButton'
import { useRouter } from 'next/navigation'

export default function SideNav() {
	const router = useRouter()
	return (
		<div className="w-16 border-r h-full flex flex-col items-center gap-3 py-4">
			<NavButton icon={<Notebook />} isActive onClick={() => router.push('/')} />
			<NavButton icon={<Star />} onClick={() => router.push('/important')} />
			<NavButton icon={<Trash2 />} onClick={() => router.push('/trash')} />
		</div>
	)
}
