import QueryProvider from '@/lib/query/QueryProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
			<body className={inter.className}>
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	)
}
