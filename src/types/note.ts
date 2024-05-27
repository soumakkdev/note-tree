export interface INote {
	title: string
	content?: string
	updatedAt: string
	createdAt: string
	id: string
}

export interface SQLNote {
	title: string
	content?: string
	updated_at: string
	created_at: string
	id: number
}

export interface IUpdateNote {
	title?: string
	content?: string
}
