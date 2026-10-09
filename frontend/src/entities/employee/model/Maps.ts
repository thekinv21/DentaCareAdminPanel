import type { Tone } from '@/shared/ui/badge'

import type { StaffRole, StaffStatus } from './Types'

export const STAFF_ROLE: Record<StaffRole, { label: string; tone: Tone }> = {
	dentist: { label: 'dentist', tone: 'brand' },
	assistant: { label: 'assistant', tone: 'info' },
	reception: { label: 'administrator', tone: 'neutral' },
}

export const STAFF_STATUS: Record<
	StaffStatus,
	{ label: string; tone: Tone; dotClass: string }
> = {
	on: { label: 'onShift', tone: 'ok', dotClass: 'bg-success' },
	off: { label: 'dayOff', tone: 'neutral', dotClass: 'bg-line-strong' },
	leave: { label: 'leave', tone: 'accent', dotClass: 'bg-accent' },
}
