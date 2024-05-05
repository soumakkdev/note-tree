import { HydrationBoundary, QueryClient, QueryFunction, QueryKey, dehydrate } from '@tanstack/react-query'
import React, { ReactNode } from 'react'

export default async function PrefetchQuery({ children, queryKey, queryFn }: { children: ReactNode; queryKey: QueryKey; queryFn: QueryFunction }) {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery({
		queryKey,
		queryFn,
	})

	return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
}
