'use client'

import { type ClipboardEvent, type KeyboardEvent, useRef } from 'react'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { ROUTES } from '@/shared/routes'

import { CODE_LENGTH, type TVerifyValues, verifySchema } from './Schema'

const onlyDigits = (value: string) => value.replace(/\D/g, '')

/**
 * Six one-digit inputs with auto-advance, backspace and paste; any full code signs in (no backend yet)
 */
export function useVerifyCode() {
	const router = useRouter()
	const methods = useForm<TVerifyValues>({
		resolver: zodResolver(verifySchema),
		defaultValues: {
			code: Array(CODE_LENGTH).fill(''),
			rememberDevice: true,
		},
	})
	const code = useWatch({ control: methods.control, name: 'code' })
	const inputs = useRef<(HTMLInputElement | null)[]>([])
	const focus = (index: number) => inputs.current[index]?.focus()
	const setCode = (next: string[]) => methods.setValue('code', next)

	const cellProps = (index: number) => ({
		ref: (element: HTMLInputElement | null) => {
			inputs.current[index] = element
		},
		value: code[index],
		onChange: (event: { target: { value: string } }) => {
			const digit = onlyDigits(event.target.value).slice(-1)
			setCode(code.map((d, i) => (i === index ? digit : d)))
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
			setCode(Array.from({ length: CODE_LENGTH }, (_, i) => digits[i] ?? ''))
			focus(Math.min(digits.length, CODE_LENGTH - 1))
		},
	})

	return {
		cells: code.map((digit, index) => ({
			index,
			filled: !!digit,
			props: cellProps(index),
		})),
		ready: code.every(Boolean),
		rememberProps: methods.register('rememberDevice'),
		submit: methods.handleSubmit(() => router.push(ROUTES.dashboard)),
	}
}
