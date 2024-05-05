'use client'

import React, { useEffect, useState } from 'react'
import '@blocknote/core/fonts/inter.css'
import '@blocknote/react/style.css'
import { BlockNoteView, useCreateBlockNote } from '@blocknote/react'
import { Block } from '@blocknote/core'

export default function NoteEditor({ initialValue }: { initialValue: string }) {
	const [blocks, setBlocks] = useState<Block[]>([])

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
			onChange={() => {
				// Saves the document JSON to state.
				setBlocks(editor.document)
			}}
			theme="light"
		/>
	)
}
