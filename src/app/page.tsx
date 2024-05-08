import SideNav from '@/components/layout/SideNav'
import NoteContent from '@/components/notes/NoteContent'
import NotesList from '@/components/notes/NotesList'

export default function Home() {
	return (
		<div className="h-full flex">
			<SideNav />
			<NotesList />
			<NoteContent />
		</div>
	)
}
