'use client'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { mockRequest } from '@/shared/api'
import { translateOptional } from '@/shared/lib/i18n'

import { INITIAL_PREFERENCES, PROFILE_FIELDS } from './Profile'
import type { TProfileFormValues } from './ProfileForm'

/**
 * Profile form with its save/dirty state
 */
export function useProfileForm() {
	const t = useTranslations('Profile')
	const methods = useForm<TProfileFormValues>({
		defaultValues: {
			profile: Object.fromEntries(
				PROFILE_FIELDS.map(field => [
					field.name,
					translateOptional(t, field.value),
				]),
			) as TProfileFormValues['profile'],
			defaultChair: 'chair1',
			scheduleView: 'week',
			signature: t('kasymovaABChief'),
			password: { current: '', next: '', repeat: '' },
			prefs: INITIAL_PREFERENCES,
			doNotDisturb: '21:00 – 07:30',
			daySummary: 'daily',
		},
	})
	const { isDirty, isSubmitting, isSubmitSuccessful } = methods.formState

	return {
		methods,
		saved: isSubmitSuccessful,
		dirty: isDirty,
		saving: isSubmitting,
		submit: methods.handleSubmit(async values => {
			await mockRequest()
			methods.reset({
				...values,
				password: { current: '', next: '', repeat: '' },
			})
		}),
		reset: () => methods.reset(),
	}
}
