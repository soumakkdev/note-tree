import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'
import QueryProvider from '@/lib/query/QueryProvider'

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Note Tree',
	description: 'A simple notes app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={raleway.className}>
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	)
}
