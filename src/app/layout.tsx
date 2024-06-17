import QueryProvider from '@/lib/query/QueryProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'

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
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					<QueryProvider>{children}</QueryProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
