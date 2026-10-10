'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { resetSchema, type TResetValues } from './Schema'

/**
 * New password form; a valid form shows the "password updated" state (no backend yet)
 */
export function useResetPassword() {
	const methods = useForm<TResetValues>({
		resolver: zodResolver(resetSchema),
		defaultValues: { password: '', confirm: '', signOutOthers: true },
	})

	return {
		methods,
		done: methods.formState.isSubmitSuccessful,
		submit: methods.handleSubmit(() => {}),
	}
}
