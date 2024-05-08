'use client'

import '@blocknote/core/fonts/inter.css'
import { BlockNoteView, useCreateBlockNote } from '@blocknote/react'
import '@blocknote/react/style.css'
import { useEffect } from 'react'

export default function NoteEditor({ initialValue, onChange }: { initialValue: string; onChange: (data: string) => void }) {
	// const [blocks, setBlocks] = useState<Block[]>([])

	// Creates a new editor instance.
	const editor = useCreateBlockNote()

	useEffect(() => {
		async function loadInitialHTML() {
			const blocks = await editor.tryParseHTMLToBlocks(initialValue)
			editor.replaceBlocks(editor.document, blocks)
		}
		if (initialValue) {
			loadInitialHTML()
		}
	}, [editor, initialValue])

	// Renders the editor instance using a React component.
	return (
		<BlockNoteView
			editor={editor}
			onChange={async () => {
				// Saves the document JSON to state.
				// setBlocks(editor.document)

				const html = await editor.blocksToHTMLLossy(editor.document)
				onChange(html)
			}}
			theme="light"
		/>
	)
}
