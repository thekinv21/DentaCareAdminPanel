'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useI18n } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'

import {
	CITIES,
	CLINIC_FIELDS,
	type RegisterInput,
	registerSchema,
	type RegisterValues,
} from './schema'

/**
 * Two-step clinic sign-up; step 1 is validated before moving on (no backend yet)
 */
export function useRegisterForm() {
	const { t } = useI18n()
	const router = useRouter()
	const [step, setStep] = useState<1 | 2>(1)
	const form = useForm<RegisterInput, unknown, RegisterValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			clinicName: '',
			city: 'Бишкек',
			chairs: '4',
			clinicPhone: '',
			fullName: '',
			mobile: '',
			password: '',
		},
	})
	const { errors } = form.formState

	const fieldProps = (name: keyof RegisterInput) => ({
		'aria-invalid': !!errors[name],
		'aria-describedby': errors[name] ? `${name}-error` : undefined,
		...form.register(name),
	})

	return {
		step,
		steps: [t('Клиника'), t('Администратор')].map((label, index) => ({
			label,
			number: `0${index + 1}`,
			done: index + 1 <= step,
			current: index + 1 === step,
		})),
		cities: CITIES.map(city => ({ value: city, label: t(city) })),
		fieldProps,
		errorOf: (name: keyof RegisterInput) =>
			errors[name]?.message ? t(errors[name].message) : undefined,
		next: async () => {
			if (await form.trigger(CLINIC_FIELDS)) setStep(2)
		},
		back: () => setStep(1),
		onSubmit: form.handleSubmit(() => router.push(ROUTES.verify)),
	}
}

export type RegisterFormModel = ReturnType<typeof useRegisterForm>
