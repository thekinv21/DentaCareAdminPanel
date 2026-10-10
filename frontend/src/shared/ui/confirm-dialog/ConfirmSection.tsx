import type { ReactNode } from 'react'

import { Overline } from '@/shared/ui/overline'

type TConfirmSectionProps = { label: ReactNode; children: ReactNode }

/**
 * Labeled block inside the confirm dialog
 */
export function ConfirmSection({ label, children }: TConfirmSectionProps) {
	return (
		<div className='flex flex-col gap-2'>
			<Overline as='span'>{label}</Overline>
			{children}
		</div>
	)
}
