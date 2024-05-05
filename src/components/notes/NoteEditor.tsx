'use client'

import React from 'react'
import '@blocknote/core/fonts/inter.css'
import '@blocknote/react/style.css'
import { BlockNoteView, useCreateBlockNote } from '@blocknote/react'

export default function NoteEditor() {
	// Creates a new editor instance.
	const editor = useCreateBlockNote()

	// Renders the editor instance using a React component.
	return <BlockNoteView editor={editor} theme="light" />
}
