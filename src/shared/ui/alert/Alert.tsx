import type { ReactNode } from 'react'

import { CircleCheck, Info, type LucideIcon, TriangleAlert } from 'lucide-react'

import { cn } from '@/shared/lib/cn'

type TAlertTone = 'danger' | 'warning' | 'info' | 'ok'
type TAlertSize = 'sm' | 'md'

const ALERT_TONE_CLASS: Record<TAlertTone, string> = {
	danger: 'bg-danger-soft text-danger',
	warning: 'bg-warning-soft text-warning',
	info: 'bg-info-soft text-info',
	ok: 'bg-success-soft text-success',
}

const ALERT_ICON: Record<TAlertTone, LucideIcon> = {
	danger: TriangleAlert,
	warning: TriangleAlert,
	info: Info,
	ok: CircleCheck,
}

const ALERT_SIZE_CLASS: Record<TAlertSize, string> = {
	sm: 'gap-2 rounded-xl px-3 py-2.5 text-[13px] leading-4.75',
	md: 'gap-2.5 rounded-[14px] px-3.5 py-3 text-sm leading-5',
}

type TAlertProps = {
	tone?: TAlertTone
	size?: TAlertSize
	className?: string
	children: ReactNode
}

export function Alert(props: TAlertProps) {
	const { tone = 'info', size = 'md', className, children } = props

	const Icon = ALERT_ICON[tone]
	return (
		<div
			role={tone === 'danger' || tone === 'warning' ? 'alert' : 'status'}
			className={cn(
				'flex items-start',
				ALERT_SIZE_CLASS[size],
				ALERT_TONE_CLASS[tone],
				className,
			)}
		>
			<Icon
				size={size === 'sm' ? 16 : 18}
				aria-hidden='true'
				className='mt-px shrink-0'
			/>
			<div className='min-w-0 flex-1'>{children}</div>
		</div>
	)
}
