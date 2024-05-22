import SideNav from '@/components/layout/SideNav'
import NoteContent from '@/components/notes/editor/NoteContent'
import NotesList from '@/components/notes/list/NotesList'

export default function Home() {
	return (
		<div className="h-full flex">
			{/* <SideNav /> */}
			<NotesList />
			<NoteContent />
		</div>
	)
}
