'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { mockRequest } from '@/shared/api'
import { useFormat } from '@/shared/lib/i18n'
import type { Tone } from '@/shared/ui/badge'
import { useConfirm } from '@/shared/ui/confirm-dialog'
import { useToast } from '@/shared/ui/toast'

import { SHIFT, type ShiftKey, WEEK_START } from './Roster'

export type TShiftType = 'work' | 'off' | 'leave' | 'sick' | 'cover'
export type TShiftRepeat = 'once' | 'week' | '2w'

export const SHIFT_TYPES: TShiftType[] = [
	'work',
	'off',
	'leave',
	'sick',
	'cover',
]
export const SHIFT_REPEATS: TShiftRepeat[] = ['once', 'week', '2w']

type TShiftDraft = {
	type: TShiftType
	from: string
	to: string
	chair: number
	repeat: TShiftRepeat
}

export type TShiftTarget = {
	name: string
	initials: string
	tone: Tone
	dayIndex: number
	shift: ShiftKey
}

const typeOf = (shift: ShiftKey): TShiftType =>
	shift === 'off'
		? 'off'
		: shift === 'leave'
			? 'leave'
			: shift === 'open'
				? 'cover'
				: 'work'

const addDays = (iso: string, days: number) => {
	const date = new Date(`${iso}T00:00:00Z`)
	date.setUTCDate(date.getUTCDate() + days)
	return date.toISOString().slice(0, 10)
}

/**
 * Editing one cell of the weekly roster
 */
export function useShiftForm() {
	const t = useTranslations('ShiftForm')
	const format = useFormat()
	const toast = useToast()
	const confirm = useConfirm()
	const [target, setTarget] = useState<TShiftTarget | null>(null)
	const [draft, setDraft] = useState<TShiftDraft | null>(null)
	const [saving, setSaving] = useState(false)

	const day = target
		? format.date(addDays(WEEK_START, target.dayIndex), {
				weekday: 'long',
				day: 'numeric',
				month: 'long',
			})
		: ''
	const close = () => setTarget(null)

	return {
		open: !!target && !!draft,
		target,
		day,
		draft,
		change: (patch: Partial<TShiftDraft>) =>
			setDraft(current => (current ? { ...current, ...patch } : current)),
		openFor: (next: TShiftTarget) => {
			const [from = '09:00', to = '18:00'] = SHIFT[next.shift].label.split('–')
			setTarget(next)
			setDraft({
				type: typeOf(next.shift),
				from: /\d/.test(from) ? from : '09:00',
				to: /\d/.test(to) ? to : '18:00',
				chair: 1,
				repeat: 'once',
			})
		},
		close,
		conflict: draft && draft.type !== 'work' ? t('conflictNote') : undefined,
		saving,
		save: async () => {
			setSaving(true)
			await mockRequest()
			setSaving(false)
			close()
			toast.show(t('scheduleUpdated'))
		},
		remove: () =>
			target &&
			confirm({
				tone: 'danger',
				title: t('deleteShiftQuestion'),
				description: t('deleteShiftDescription'),
				subject: {
					title: target.name,
					subtitle: day,
					initials: target.initials,
					tone: target.tone,
				},
				confirmText: t('deleteShift'),
				pendingText: t('deleting'),
				successText: t('shiftDeleted'),
				onConfirm: () => mockRequest().then(close),
			}),
	}
}

export type TShiftFormModel = ReturnType<typeof useShiftForm>
