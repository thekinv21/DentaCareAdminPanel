'use client'

import { type KeyboardEvent, useState } from 'react'

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
} from './RegisterSchema'

/**
 * Two-step clinic sign-up; step 1 is validated before moving on (no backend yet)
 */
export function useRegisterForm() {
	const t = useTranslations('Register')

	const router = useRouter()

	const [step, setStep] = useState<1 | 2>(1)

	const form = useForm<TRegisterInput, unknown, TRegisterValues>({
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

	const onNext = async () => {
		if (await form.trigger(CLINIC_FIELDS)) setStep(2)
	}

	const steps = [t('clinic'), t('administrator')].map((label, index) => ({
		label,
		number: `0${index + 1}`,
		isDone: index + 1 <= step,
		isCurrent: index + 1 === step,
	}))

	/**
	 * On the clinic step Enter means "next", it must not submit the whole form
	 */
	const onKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
		if (step !== 1 || event.key !== 'Enter') return

		if ((event.target as HTMLElement).tagName !== 'INPUT') return

		event.preventDefault()

		onNext()
	}

	const onBack = () => setStep(1)

	const onSubmit = form.handleSubmit(() => router.push(ROUTES.verify))

	return { form, step, steps, onNext, onKeyDown, onBack, onSubmit }
}
