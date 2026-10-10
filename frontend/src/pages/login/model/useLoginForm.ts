'use client'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { ROUTES } from '@/shared/routes'

import { loginSchema, type TLoginValues } from './LoginSchema'

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
		submit: methods.handleSubmit(() => router.push(ROUTES.verify)),
	}
}
