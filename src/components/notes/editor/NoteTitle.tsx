import { useEffect, useState } from 'react'
import { Input } from '../../ui/input'

export default function NoteTitle({ title, onTitleIUpdate }: { title: string; onTitleIUpdate: (title: string) => void }) {
	const [text, setText] = useState(title)

	useEffect(() => {
		if (title) {
			setText(title)
		}
	}, [title])

	function handleBlur() {
		if (text !== title) {
			onTitleIUpdate(text)
		}
	}

	return (
		<div>
			<Input onBlur={handleBlur} value={text} onChange={(e) => setText(e.target.value)} className="text-xl font-bold outline-none border-0" />
		</div>
	)
}
