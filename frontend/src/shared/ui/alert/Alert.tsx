import type { ReactNode } from 'react'

import { CircleAlert, Info, TriangleAlert } from 'lucide-react'

import { cn } from '@/shared/lib/cn'

type AlertTone = 'danger' | 'info' | 'ok'

const TONE: Record<AlertTone, string> = {
	danger: 'bg-danger-soft text-danger',
	info: 'bg-info-soft text-info',
	ok: 'bg-success-soft text-success',
}

const ICON = { danger: TriangleAlert, info: Info, ok: CircleAlert }

interface AlertProps {
	tone?: AlertTone
	className?: string
	children: ReactNode
}

export function Alert({ tone = 'info', className, children }: AlertProps) {
	const Icon = ICON[tone]
	return (
		<div
			role={tone === 'danger' ? 'alert' : 'status'}
			className={cn(
				'flex items-start gap-2.5 rounded-[14px] px-3.5 py-3 text-sm leading-5',
				TONE[tone],
				className,
			)}
		>
			<Icon size={18} aria-hidden='true' className='mt-px shrink-0' />
			<span>{children}</span>
		</div>
	)
}
