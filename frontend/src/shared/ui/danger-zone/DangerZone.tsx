import type { ReactNode } from 'react'

type TDangerZoneProps = {
	title: string
	description: ReactNode
	actions: ReactNode
}

/**
 * Red-tinted row for irreversible actions at the end of an edit form
 */
export function DangerZone({ title, description, actions }: TDangerZoneProps) {
	return (
		<div className='flex flex-wrap items-center gap-3 rounded-[14px] border border-danger-soft bg-[color-mix(in_srgb,var(--danger-soft)_40%,var(--surface))] p-3.5'>
			<div className='min-w-50 flex-1'>
				<div className='font-bold'>{title}</div>
				<div className='text-[12.5px] leading-4.5 text-ink-muted'>
					{description}
				</div>
			</div>
			{actions}
		</div>
	)
}
