'use client'
import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

export default function NavButton({ icon, isActive, onClick }: { icon: ReactNode; isActive?: boolean; onClick: () => void }) {
	return (
		<button
			onClick={onClick}
			className={cn('h-12 w-12 hover:bg-primary-surface flex items-center justify-center rounded-2xl', {
				'text-primary bg-primary-surface': isActive,
			})}
		>
			{icon}
		</button>
	)
}
