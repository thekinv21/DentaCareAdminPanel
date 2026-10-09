'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useI18n } from '@/shared/lib/i18n'

import { forgotSchema, type ForgotValues } from './schema'

function maskPhone(phone: string) {
	const digits = phone.replace(/\D/g, '')
	return `+996 ${digits.slice(0, 3)} ••• ${digits.slice(-3)}`
}

/**
 * Phone form and the "link sent" state of password recovery
 */
export function useForgotPassword() {
	const { t } = useI18n()
	const [sentTo, setSentTo] = useState<string | null>(null)
	const form = useForm<ForgotValues>({
		resolver: zodResolver(forgotSchema),
		defaultValues: { phone: '' },
	})
	const error = form.formState.errors.phone?.message

	return {
		sent: sentTo !== null,
		maskedPhone: sentTo ? maskPhone(sentTo) : '',
		phoneError: error ? t(error) : undefined,
		phoneProps: {
			'aria-invalid': !!error,
			'aria-describedby': error ? 'phone-error' : undefined,
			...form.register('phone'),
		},
		onSubmit: form.handleSubmit(values => setSentTo(values.phone)),
		changeNumber: () => setSentTo(null),
	}
}
