'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { forgotSchema, type TForgotValues } from './ForgotPasswordSchema'

function maskPhone(phone: string) {
	const digits = phone.replace(/\D/g, '')

	return `+996 ${digits.slice(0, 3)} ••• ${digits.slice(-3)}`
}

export function useForgotPassword() {
	const form = useForm<TForgotValues>({
		resolver: zodResolver(forgotSchema),
		defaultValues: { phone: '' },
	})

	const isSent = form.formState.isSubmitSuccessful

	const maskedPhone = maskPhone(form.getValues('phone'))

	const onSubmit = form.handleSubmit(() => {})

	const onChangeNumber = () => form.reset(form.getValues())

	return { form, isSent, maskedPhone, onSubmit, onChangeNumber }
}
