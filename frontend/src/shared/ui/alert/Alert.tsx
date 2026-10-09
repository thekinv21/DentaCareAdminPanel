import type { ReactNode } from 'react'

import { CircleAlert, Info, TriangleAlert } from 'lucide-react'

import { cn } from '@/shared/lib/cn'

type AlertTone = 'danger' | 'warning' | 'info' | 'ok'

const TONE: Record<AlertTone, string> = {
	danger: 'bg-danger-soft text-danger',
	warning: 'bg-warning-soft text-warning',
	info: 'bg-info-soft text-info',
	ok: 'bg-success-soft text-success',
}

const ICON = {
	danger: TriangleAlert,
	warning: TriangleAlert,
	info: Info,
	ok: CircleAlert,
}

type TAlertProps = {
	tone?: AlertTone
	className?: string
	children: ReactNode
}

export function Alert({ tone = 'info', className, children }: TAlertProps) {
	const Icon = ICON[tone]
	return (
		<div
			role={tone === 'danger' || tone === 'warning' ? 'alert' : 'status'}
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
