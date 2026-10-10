'use client'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { ROUTES } from '@/shared/routes'

import { loginSchema, type TLoginValues } from './Schema'

/**
 * Sign-in form by phone or email; a valid form continues to the SMS step (no backend yet)
 */
export function useLoginForm() {
	const router = useRouter()
	const methods = useForm<TLoginValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: { method: 'phone', phone: '', password: '', remember: true },
	})
	const method = useWatch({ control: methods.control, name: 'method' })

	return {
		methods,
		method,
		submitting: methods.formState.isSubmitting,
		submit: methods.handleSubmit(() => router.push(ROUTES.verify)),
	}
}
