'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { useI18n } from '@/shared/lib/i18n'
import { PASSWORD_RULES } from '@/shared/lib/validation'

import { resetSchema, type ResetValues, STRENGTH } from './schema'

/**
 * New password form with a live strength meter and rule checklist
 */
export function useResetPassword() {
	const { t } = useI18n()
	const [done, setDone] = useState(false)
	const form = useForm<ResetValues>({
		resolver: zodResolver(resetSchema),
		defaultValues: { password: '', confirm: '', signOutOthers: true },
	})
	const password = useWatch({ control: form.control, name: 'password' })
	const { errors } = form.formState
	const score = PASSWORD_RULES.filter(rule => rule.test(password)).length
	const strength = STRENGTH[score]

	return {
		done,
		passwordProps: {
			'aria-invalid': !!errors.password,
			'aria-describedby': 'password-strength',
			...form.register('password'),
		},
		confirmProps: {
			'aria-invalid': !!errors.confirm,
			'aria-describedby': errors.confirm ? 'confirm-error' : undefined,
			...form.register('confirm'),
		},
		signOutProps: form.register('signOutOthers'),
		passwordError: errors.password?.message
			? t(errors.password.message)
			: undefined,
		confirmError: errors.confirm?.message
			? t(errors.confirm.message)
			: undefined,
		meter: [0, 1, 2, 3].map(i => (i < score ? strength.color : 'bg-line')),
		strength: { label: t(strength.label), textClass: strength.text },
		rules: PASSWORD_RULES.map(rule => ({
			label: t(rule.label),
			ok: rule.test(password),
		})),
		onSubmit: form.handleSubmit(() => setDone(true)),
	}
}

export type ResetPasswordModel = ReturnType<typeof useResetPassword>
