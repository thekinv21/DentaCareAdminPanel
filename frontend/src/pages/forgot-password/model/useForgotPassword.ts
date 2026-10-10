'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { forgotSchema, type TForgotValues } from './Schema'

function maskPhone(phone: string) {
	const digits = phone.replace(/\D/g, '')
	return `+996 ${digits.slice(0, 3)} ••• ${digits.slice(-3)}`
}

/**
 * Phone form and the "link sent" state of password recovery
 */
export function useForgotPassword() {
	const methods = useForm<TForgotValues>({
		resolver: zodResolver(forgotSchema),
		defaultValues: { phone: '' },
	})

	return {
		methods,
		sent: methods.formState.isSubmitSuccessful,
		maskedPhone: maskPhone(methods.getValues('phone')),
		submit: methods.handleSubmit(() => {}),
		changeNumber: () => methods.reset(methods.getValues()),
	}
}
