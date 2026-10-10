'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { resetSchema, type TResetValues } from './ResetPasswordSchema'

export function useResetPassword() {
	const form = useForm<TResetValues>({
		resolver: zodResolver(resetSchema),
		defaultValues: { password: '', confirmPassword: '', signOutOthers: true },
	})

	const done = form.formState.isSubmitSuccessful

	const onSubmit = form.handleSubmit(() => {})

	return { form, done, onSubmit }
}
