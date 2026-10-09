import type { Tone } from '@/shared/ui/badge'

import type { StaffRole, StaffStatus } from './types'

export const STAFF_ROLE: Record<StaffRole, { label: string; tone: Tone }> = {
	dentist: { label: 'Врач', tone: 'brand' },
	assistant: { label: 'Ассистент', tone: 'info' },
	reception: { label: 'Администратор', tone: 'neutral' },
}

export const STAFF_STATUS: Record<
	StaffStatus,
	{ label: string; tone: Tone; dotClass: string }
> = {
	on: { label: 'На смене', tone: 'ok', dotClass: 'bg-success' },
	off: { label: 'Выходной', tone: 'neutral', dotClass: 'bg-line-strong' },
	leave: { label: 'Отпуск', tone: 'accent', dotClass: 'bg-accent' },
}
