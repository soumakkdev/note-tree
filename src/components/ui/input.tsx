import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	startIcon?: React.ReactNode
	endIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, startIcon, endIcon, ...props }, ref) => {
	return (
		<div className="relative">
			{startIcon ? <div className="absolute inset-y-0 left-0 flex items-center pl-2">{startIcon}</div> : null}

			<input
				type={type}
				className={cn(
					'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
					className,
					{ 'pl-8': !!startIcon, 'pr-8': !!endIcon }
				)}
				ref={ref}
				{...props}
			/>

			{endIcon ? <div className="absolute inset-y-0 right-0 flex items-center pr-2">{endIcon}</div> : null}
		</div>
	)
})
Input.displayName = 'Input'

export { Input }
