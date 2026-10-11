import { getInitials } from '@/shared/lib/format'
import { Avatar } from '@/shared/ui/avatar'

import type { TConfirmOptions } from './ConfirmTypes'

type TConfirmSubjectProps = {
	subject: NonNullable<TConfirmOptions['subject']>
}

/**
 * The one record the action touches
 */
export function ConfirmSubject({ subject }: TConfirmSubjectProps) {
	return (
		<div className='flex items-center gap-2.5 rounded-[14px] border border-line bg-raised px-3 py-2.5'>
			<Avatar
				initials={subject.initials ?? getInitials(subject.title)}
				tone={subject.tone ?? 'neutral'}
				size={34}
			/>
			<div className='min-w-0'>
				<div className='truncate font-bold'>{subject.title}</div>
				{subject.subtitle && (
					<div className='truncate text-[12.5px] text-ink-muted'>
						{subject.subtitle}
					</div>
				)}
			</div>
		</div>
	)
}
