'use client'

import { type ClipboardEvent, type KeyboardEvent, useRef } from 'react'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { ROUTES } from '@/shared/routes'

import { CODE_LENGTH, type TVerifyValues, verifySchema } from './VerifySchema'

const onlyDigits = (value: string) => value.replace(/\D/g, '')

/**
 * Six one-digit inputs with auto-advance, backspace and paste; any full code signs in (no backend yet)
 */
export function useVerifyCode() {
	const router = useRouter()

	const form = useForm<TVerifyValues>({
		resolver: zodResolver(verifySchema),
		defaultValues: {
			code: Array(CODE_LENGTH).fill(''),
			rememberDevice: true,
		},
	})

	const code = useWatch({ control: form.control, name: 'code' })

	const inputs = useRef<(HTMLInputElement | null)[]>([])

	const focus = (position: number) => inputs.current[position]?.focus()

	const setCode = (next: string[]) => form.setValue('code', next)

	/**
	 * Writes digits from `position` on; used by typing, OS autofill and paste
	 */
	const fillFrom = (position: number, digits: string) => {
		const next = [...code]

		digits
			.slice(0, CODE_LENGTH - position)
			.split('')
			.forEach((digit, offset) => {
				next[position + offset] = digit
			})

		setCode(next)

		focus(Math.min(position + digits.length, CODE_LENGTH - 1))
	}

	const cellProps = (index: number) => ({
		ref: (element: HTMLInputElement | null) => {
			inputs.current[index] = element
		},
		value: code[index],
		onChange: (event: { target: { value: string } }) => {
			const digits = onlyDigits(event.target.value)

			// typing over a filled cell gives two digits: keep the new one
			const isTypingOver = digits.length === 2 && !!code[index]

			// a one-time code autofilled by the OS arrives whole in one cell
			if (digits.length > 1 && !isTypingOver) return fillFrom(index, digits)

			const digit = digits.slice(-1)

			setCode(
				code.map((current, position) => (position === index ? digit : current)),
			)

			if (digit && index < CODE_LENGTH - 1) focus(index + 1)
		},
		onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Backspace' && !code[index] && index > 0)
				focus(index - 1)
		},
		onPaste: (event: ClipboardEvent<HTMLInputElement>) => {
			const digits = onlyDigits(event.clipboardData.getData('text')).slice(
				0,
				CODE_LENGTH,
			)

			if (!digits) return

			event.preventDefault()

			setCode(
				Array.from(
					{ length: CODE_LENGTH },
					(_, position) => digits[position] ?? '',
				),
			)

			focus(Math.min(digits.length, CODE_LENGTH - 1))
		},
	})

	const cells = code.map((digit, index) => ({
		index,
		isFilled: !!digit,
		props: cellProps(index),
	}))

	const isComplete = code.every(Boolean)

	const rememberProps = form.register('rememberDevice')

	const onSubmit = form.handleSubmit(() => router.push(ROUTES.dashboard))

	return { cells, isComplete, rememberProps, onSubmit }
}
