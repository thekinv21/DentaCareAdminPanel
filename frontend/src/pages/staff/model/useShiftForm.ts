'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { mockRequest } from '@/shared/api'
import { addDays } from '@/shared/lib/date'
import { useFormat } from '@/shared/lib/i18n'
import type { TTone } from '@/shared/ui/badge'
import { useConfirm } from '@/shared/ui/confirm-dialog'
import { useToast } from '@/shared/ui/toast'

import { type TRosterShift, WEEK_START } from './Roster'
import { shiftFormSchema, type TShiftFormValues } from './ShiftFormSchema'

export type TShiftTarget = {
	name: string
	initials: string
	tone: TTone
	dayIndex: number
	shift: TRosterShift
}

const DEFAULT_HOURS = { from: '09:00', to: '18:00' }

function toFormValues(target: TShiftTarget): TShiftFormValues {
	const hours = target.shift.hours ?? DEFAULT_HOURS
	return {
		type: target.shift.kind,
		from: hours.from,
		to: hours.to,
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
		isOpen: !!target,
		target,
		day,
		isWork: type === 'work',
		conflict: type && type !== 'work' ? t('conflictNote') : undefined,
		openFor: (next: TShiftTarget) => {
			setTarget(next)
			methods.reset(toFormValues(next))
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
