import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Loader({ className }: { className?: string }) {
	return <Loader2 className={cn('animate-spin text-primary h-6 w-6', className)} />
}
