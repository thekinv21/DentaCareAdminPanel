'use client'

import type { ReactNode } from 'react'

import Link from 'next/link'

import { Pencil, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { IconButton } from '@/shared/ui/icon-button'

const editLinkClass =
	'inline-flex h-8 min-w-8 items-center justify-center rounded-xl text-ink-muted transition-colors hover:bg-raised'

type TRowActionsProps = {
	/**
	 * Name of the row's record, read out in the button labels
	 */
	subject: string
	onEdit?: () => void
	/**
	 * Edit opens a page instead of a modal
	 */
	editHref?: string
	onDelete: () => void
	/**
	 * Extra actions before edit and delete
	 */
	children?: ReactNode
}

/**
 * Edit and delete icon buttons at the end of a table row
 */
export function RowActions(props: TRowActionsProps) {
	const { subject, onEdit, editHref, onDelete, children } = props

	const t = useTranslations('Common')
	const editLabel = t('editItem', { name: subject })
	const editIcon = <Pencil size={16} aria-hidden='true' />

	return (
		<span className='inline-flex items-center gap-0.5'>
			{children}
			{editHref ? (
				<Link
					href={editHref}
					aria-label={editLabel}
					title={t('edit')}
					className={editLinkClass}
				>
					{editIcon}
				</Link>
			) : (
				<IconButton
					quiet
					size='sm'
					aria-label={editLabel}
					title={t('edit')}
					onClick={onEdit}
				>
					{editIcon}
				</IconButton>
			)}
			<IconButton
				quiet
				size='sm'
				aria-label={t('deleteItem', { name: subject })}
				title={t('delete')}
				onClick={onDelete}
				className='text-danger'
			>
				<Trash2 size={16} aria-hidden='true' />
			</IconButton>
		</span>
	)
}
