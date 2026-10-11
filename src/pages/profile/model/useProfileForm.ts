'use client'

import { useMemo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { mockRequest } from '@/shared/api'
import { translateOptional, useFormat } from '@/shared/lib/i18n'

import { INITIAL_NOTIFICATIONS, PROFILE_FIELDS } from './Profile'
import {
	EMPTY_PASSWORD,
	profileFormSchema,
	type TProfileFormValues,
} from './ProfileFormSchema'

const NAME_FIELDS = new Set(['lastName', 'firstName'])

/**
 * Profile form with its save/dirty state; the password fields clear after a save
 */
export function useProfileForm() {
	const t = useTranslations('Profile')
	const format = useFormat()

	// useForm reads the defaults only on the first render, so build them once
	const defaultValues = useMemo<TProfileFormValues>(
		() => ({
			profile: Object.fromEntries(
				PROFILE_FIELDS.map(field => [
					field.name,
					NAME_FIELDS.has(field.name)
						? format.name(field.value)
						: translateOptional(t, field.value),
				]),
			) as TProfileFormValues['profile'],
			defaultChair: 'chair1',
			scheduleView: 'week',
			signature: t('defaultSignature'),
			password: EMPTY_PASSWORD,
			security: { twoFactor: true, newDeviceAlert: true, autoLock: true },
			notifications: INITIAL_NOTIFICATIONS,
			doNotDisturb: '21:00 – 07:30',
			daySummary: 'daily',
		}),
		[format, t],
	)

	const methods = useForm<TProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues,
	})
	const { isDirty, isSubmitting, isSubmitSuccessful } = methods.formState

	const submit = methods.handleSubmit(async values => {
		await mockRequest()
		methods.reset({ ...values, password: EMPTY_PASSWORD })
	})
	const reset = () => methods.reset()

	return {
		methods,
		saved: isSubmitSuccessful,
		dirty: isDirty,
		saving: isSubmitting,
		submit,
		reset,
	}
}
