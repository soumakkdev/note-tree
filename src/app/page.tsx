import NotesList from '@/components/notes/NotesList'
import SideNav from '@/components/layout/SideNav'
import NoteContent from '@/components/notes/NoteContent'
import PrefetchQuery from '@/lib/query/PrefetchQuery'
import { getNotes } from '@/actions/notesActions'

export default function Home() {
	return (
		<div className="h-full flex">
			<SideNav />
			<PrefetchQuery queryFn={getNotes} queryKey={['notes']}>
				<NotesList />
			</PrefetchQuery>
			<NoteContent />
		</div>
	)
}
