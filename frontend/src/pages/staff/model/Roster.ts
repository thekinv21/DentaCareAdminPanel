import type { TTone } from '@/shared/ui/badge'

export type TShiftKind = 'work' | 'off' | 'leave' | 'cover'

export type TRosterShift = {
	kind: TShiftKind
	/**
	 * Working hours of a work shift
	 */
	hours?: { from: string; to: string }
}

export const SHIFT_KIND: Record<TShiftKind, { label: string; tone: TTone }> = {
	work: { label: 'shift', tone: 'brand' },
	off: { label: 'dayOff', tone: 'neutral' },
	leave: { label: 'leave', tone: 'accent' },
	cover: { label: 'replacement', tone: 'warning' },
}

const shift = (from: string, to: string): TRosterShift => ({
	kind: 'work',
	hours: { from, to },
})
const DAY_OFF: TRosterShift = { kind: 'off' }
const LEAVE: TRosterShift = { kind: 'leave' }
const COVER: TRosterShift = { kind: 'cover' }

const EARLY = shift('08:30', '17:30')
const REGULAR = shift('09:00', '18:00')
const MORNING = shift('08:00', '16:00')
const AFTERNOON = shift('13:00', '18:00')

export const WEEK_START = '2026-10-05'
export const WEEK_NUMBER = 41
export const WORK_DAYS_SHOWN = 6
export const TODAY_COLUMN = 4

/**
 * Mock roster for week 41 until the backend exposes /schedule
 */
export const ROSTER: { name: string; tone: TTone; days: TRosterShift[] }[] = [
	{
		name: 'Айгерим Касымова',
		tone: 'accent',
		days: [EARLY, EARLY, EARLY, EARLY, EARLY, DAY_OFF],
	},
	{
		name: 'Сергей Петров',
		tone: 'info',
		days: [REGULAR, REGULAR, DAY_OFF, REGULAR, REGULAR, AFTERNOON],
	},
	{
		name: 'Эрмек Токтогулов',
		tone: 'ok',
		days: [MORNING, MORNING, MORNING, MORNING, MORNING, COVER],
	},
	{
		name: 'Дария Юсупова',
		tone: 'warning',
		days: [AFTERNOON, DAY_OFF, AFTERNOON, DAY_OFF, DAY_OFF, AFTERNOON],
	},
	{
		name: 'Бермет Карасаева',
		tone: 'brand',
		days: [EARLY, EARLY, EARLY, EARLY, EARLY, DAY_OFF],
	},
	{
		name: 'Ирина Гусева',
		tone: 'accent',
		days: [LEAVE, LEAVE, LEAVE, LEAVE, LEAVE, DAY_OFF],
	},
	{
		name: 'Эльмира Танаева',
		tone: 'ok',
		days: [MORNING, MORNING, MORNING, MORNING, MORNING, COVER],
	},
]

/**
 * Mock team totals for the page subtitle
 */
export const TEAM_SIZE = 12
export const ON_SHIFT_NOW = 9
