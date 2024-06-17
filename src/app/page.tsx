import SideNav from '@/components/layout/SideNav'
import NoteContent from '@/components/notes/editor/NoteContent'
import NotesList from '@/components/notes/list/NotesList'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Home() {
	const supabase = createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return redirect('/login')
	}

	return (
		<div className="h-full flex">
			<SideNav />
			<NotesList />
			<NoteContent />
		</div>
	)
}
