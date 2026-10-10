'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { ROUTES } from '@/shared/routes'

import {
	CLINIC_FIELDS,
	registerSchema,
	type TRegisterInput,
	type TRegisterValues,
} from './Schema'

/**
 * Two-step clinic sign-up; step 1 is validated before moving on (no backend yet)
 */
export function useRegisterForm() {
	const t = useTranslations('Register')
	const router = useRouter()
	const [step, setStep] = useState<1 | 2>(1)
	const methods = useForm<TRegisterInput, unknown, TRegisterValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			clinicName: '',
			city: 'bishkek',
			chairs: '4',
			clinicPhone: '',
			fullName: '',
			mobile: '',
			password: '',
		},
	})

	return {
		methods,
		step,
		steps: [t('clinic'), t('administrator')].map((label, index) => ({
			label,
			number: `0${index + 1}`,
			done: index + 1 <= step,
			current: index + 1 === step,
		})),
		next: async () => {
			if (await methods.trigger(CLINIC_FIELDS)) setStep(2)
		},
		back: () => setStep(1),
		submit: methods.handleSubmit(() => router.push(ROUTES.verify)),
	}
}
