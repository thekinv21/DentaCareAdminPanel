import type { TTone } from '@/shared/ui/badge'

import type { TStaffRole, TStaffStatus } from './Types'

export const STAFF_ROLE: Record<TStaffRole, { label: string; tone: TTone }> = {
	dentist: { label: 'dentist', tone: 'brand' },
	assistant: { label: 'assistant', tone: 'info' },
	reception: { label: 'administrator', tone: 'neutral' },
}

export const STAFF_STATUS: Record<
	TStaffStatus,
	{ label: string; tone: TTone; dotClass: string }
> = {
	on: { label: 'onShift', tone: 'ok', dotClass: 'bg-success' },
	off: { label: 'dayOff', tone: 'neutral', dotClass: 'bg-line-strong' },
	leave: { label: 'leave', tone: 'accent', dotClass: 'bg-accent' },
}
