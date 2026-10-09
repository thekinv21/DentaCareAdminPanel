import type { Tone } from '@/shared/ui/badge'

import type { AppointmentStatus } from './types'

export const APPOINTMENT_STATUS: Record<
	AppointmentStatus,
	{ label: string; tone: Tone }
> = {
	done: { label: 'Завершён', tone: 'ok' },
	chair: { label: 'В кресле', tone: 'brand' },
	next: { label: 'Следующий', tone: 'accent' },
	confirmed: { label: 'Подтверждён', tone: 'info' },
	pending: { label: 'Не подтверждён', tone: 'warning' },
	noshow: { label: 'Не пришёл', tone: 'danger' },
}

/**
 * Fill/border classes for appointment blocks in calendars and timelines
 */
export const APPOINTMENT_BLOCK_CLASS: Record<AppointmentStatus, string> = {
	done: 'bg-raised text-ink-muted border border-line',
	chair: 'bg-brand text-on-brand shadow-brand',
	next: 'bg-accent-soft text-accent border-[1.5px] border-accent',
	confirmed: 'bg-brand-soft text-brand-strong border border-brand',
	pending: 'bg-warning-soft text-warning border border-dashed border-warning',
	noshow: 'bg-danger-soft text-danger border border-dashed border-danger',
}

/**
 * Legend entries in the order the design shows them
 */
export const APPOINTMENT_LEGEND: {
	status: AppointmentStatus
	swatch: string
}[] = [
	{ status: 'confirmed', swatch: 'bg-brand-soft border border-brand' },
	{
		status: 'pending',
		swatch: 'bg-warning-soft border border-dashed border-warning',
	},
	{ status: 'chair', swatch: 'bg-brand' },
	{ status: 'next', swatch: 'bg-accent-soft border-[1.5px] border-accent' },
	{ status: 'done', swatch: 'bg-raised border border-line' },
	{
		status: 'noshow',
		swatch: 'bg-danger-soft border border-dashed border-danger',
	},
]
