import NotesList from '@/components/notes/NotesList'
import SideNav from '@/components/layout/SideNav'

export default function Home() {
	return (
		<div className="h-full flex">
			<SideNav />
			<NotesList />
		</div>
	)
}
