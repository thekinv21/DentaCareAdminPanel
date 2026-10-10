'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { mockRequest } from '@/shared/api'
import { useFormat } from '@/shared/lib/i18n'
import type { TTone } from '@/shared/ui/badge'
import { useConfirm } from '@/shared/ui/confirm-dialog'
import { useToast } from '@/shared/ui/toast'

import { SHIFT, type TShiftKey, WEEK_START } from './Roster'
import { shiftFormSchema, type TShiftFormValues } from './ShiftFormSchema'

export type TShiftTarget = {
	name: string
	initials: string
	tone: TTone
	dayIndex: number
	shift: TShiftKey
}

const TYPE_OF_SHIFT: Partial<Record<TShiftKey, TShiftFormValues['type']>> = {
	off: 'off',
	leave: 'leave',
	open: 'cover',
}

const addDays = (iso: string, days: number) => {
	const date = new Date(`${iso}T00:00:00Z`)
	date.setUTCDate(date.getUTCDate() + days)
	return date.toISOString().slice(0, 10)
}

function valuesOf(target: TShiftTarget): TShiftFormValues {
	const [from, to] = SHIFT[target.shift].label.split('–')
	const isTime = /\d/.test(SHIFT[target.shift].label)
	return {
		type: TYPE_OF_SHIFT[target.shift] ?? 'work',
		from: isTime ? from : '09:00',
		to: isTime ? to : '18:00',
		chair: 1,
		repeat: 'once',
	}
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

	const methods = useForm<TShiftFormValues>({
		resolver: zodResolver(shiftFormSchema),
	})
	const type = useWatch({ control: methods.control, name: 'type' })

	const day = target
		? format.date(addDays(WEEK_START, target.dayIndex), {
				weekday: 'long',
				day: 'numeric',
				month: 'long',
			})
		: ''
	const close = () => setTarget(null)

	return {
		methods,
		open: !!target,
		target,
		day,
		isWork: type === 'work',
		conflict: type && type !== 'work' ? t('conflictNote') : undefined,
		openFor: (next: TShiftTarget) => {
			setTarget(next)
			methods.reset(valuesOf(next))
		},
		close,
		saving: methods.formState.isSubmitting,
		submit: methods.handleSubmit(async () => {
			await mockRequest()
			close()
			toast.show(t('scheduleUpdated'))
		}),
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
