import type { Tone } from '@/shared/ui/badge'

export type ShiftKey = 's1' | 's2' | 's3' | 's4' | 'off' | 'leave' | 'open'

export const SHIFT: Record<ShiftKey, { label: string; tone: Tone }> = {
	s1: { label: '08:30–17:30', tone: 'brand' },
	s2: { label: '09:00–18:00', tone: 'brand' },
	s3: { label: '08:00–16:00', tone: 'brand' },
	s4: { label: '13:00–18:00', tone: 'brand' },
	off: { label: 'dayOff', tone: 'neutral' },
	leave: { label: 'leave', tone: 'accent' },
	open: { label: 'replacement', tone: 'warning' },
}

export const WEEK_DAYS = ['mon5', 'tue6', 'wed7', 'thu8', 'fri9', 'sat10']
export const TODAY_COLUMN = 4
export const WEEK_START = '2026-10-05'

/**
 * Mock roster for week 41 until the backend exposes /schedule
 */
export const ROSTER: { name: string; tone: Tone; days: ShiftKey[] }[] = [
	{
		name: 'Айгерим Касымова',
		tone: 'accent',
		days: ['s1', 's1', 's1', 's1', 's1', 'off'],
	},
	{
		name: 'Сергей Петров',
		tone: 'info',
		days: ['s2', 's2', 'off', 's2', 's2', 's4'],
	},
	{
		name: 'Эрмек Токтогулов',
		tone: 'ok',
		days: ['s3', 's3', 's3', 's3', 's3', 'open'],
	},
	{
		name: 'Дария Юсупова',
		tone: 'warning',
		days: ['s4', 'off', 's4', 'off', 'off', 's4'],
	},
	{
		name: 'Бермет Карасаева',
		tone: 'brand',
		days: ['s1', 's1', 's1', 's1', 's1', 'off'],
	},
	{
		name: 'Ирина Гусева',
		tone: 'accent',
		days: ['leave', 'leave', 'leave', 'leave', 'leave', 'off'],
	},
	{
		name: 'Эльмира Танаева',
		tone: 'ok',
		days: ['s3', 's3', 's3', 's3', 's3', 'open'],
	},
]
