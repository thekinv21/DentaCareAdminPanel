import type { TTone } from '@/shared/ui/badge'

import type { TAppointmentStatus } from './Types'

export const APPOINTMENT_STATUS: Record<
	TAppointmentStatus,
	{ label: string; tone: TTone }
> = {
	done: { label: 'completed', tone: 'ok' },
	chair: { label: 'inChair', tone: 'brand' },
	next: { label: 'next', tone: 'accent' },
	confirmed: { label: 'confirmed', tone: 'info' },
	pending: { label: 'notConfirmed', tone: 'warning' },
	noshow: { label: 'noShow', tone: 'danger' },
}

/**
 * Fill/border classes for appointment blocks in calendars and timelines
 */
export const APPOINTMENT_BLOCK_CLASS: Record<TAppointmentStatus, string> = {
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
	status: TAppointmentStatus
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
