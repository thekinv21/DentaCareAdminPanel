import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'

type TSubjectTileProps = {
	/**
	 * Avatar or icon on the left
	 */
	media: ReactNode
	title: ReactNode
	caption?: ReactNode
	/**
	 * Button on the right, e.g. "Change"
	 */
	action?: ReactNode
	compact?: boolean
}

/**
 * Brand-tinted card naming the record a form works on (a patient, an item, a person)
 */
export function SubjectTile(props: TSubjectTileProps) {
	const { media, title, caption, action, compact } = props

	return (
		<div
			className={cn(
				'flex items-center gap-3 rounded-[14px] border-[1.5px] border-brand bg-brand-soft',
				compact ? 'px-2.5 py-2' : 'px-3 py-2.5',
			)}
		>
			{media}
			<div className='min-w-0 flex-1'>
				<div className='truncate font-bold'>{title}</div>
				{caption && (
					<div className='text-[12.5px] text-ink-muted'>{caption}</div>
				)}
			</div>
			{action}
		</div>
	)
}
