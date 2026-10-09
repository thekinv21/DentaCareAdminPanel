'use client'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { useI18n } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'

import { loginSchema, type LoginValues } from './schema'

type FieldName = 'phone' | 'email' | 'password'

/**
 * Sign-in form by phone or email; a valid form continues to the SMS step (no backend yet)
 */
export function useLoginForm() {
	const { t } = useI18n()
	const router = useRouter()
	const form = useForm<LoginValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: { method: 'phone', phone: '', password: '', remember: true },
	})
	const method = useWatch({ control: form.control, name: 'method' })
	const errors = form.formState.errors as Partial<
		Record<FieldName, { message?: string }>
	>

	const fieldProps = (name: FieldName) => ({
		'aria-invalid': !!errors[name],
		'aria-describedby': errors[name] ? `${name}-error` : undefined,
		...form.register(name),
	})

	return {
		method,
		methods: [
			{ id: 'phone' as const, label: t('Телефон') },
			{ id: 'email' as const, label: t('Email') },
		],
		setMethod: (next: LoginValues['method']) => form.setValue('method', next),
		fieldProps,
		errorOf: (name: FieldName) =>
			errors[name]?.message ? t(errors[name].message) : undefined,
		rememberProps: form.register('remember'),
		submitting: form.formState.isSubmitting,
		onSubmit: form.handleSubmit(() => router.push(ROUTES.verify)),
	}
}
