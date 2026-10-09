'use client'

import {
	type ClipboardEvent,
	type KeyboardEvent,
	type SyntheticEvent,
	useRef,
	useState,
} from 'react'

import { useRouter } from 'next/navigation'

import { ROUTES } from '@/shared/routes'

const LENGTH = 6

/**
 * Six one-digit inputs with auto-advance, backspace and paste; any full code signs in (no backend yet)
 */
export function useVerifyCode() {
	const router = useRouter()
	const [code, setCode] = useState<string[]>(Array(LENGTH).fill(''))
	const inputs = useRef<(HTMLInputElement | null)[]>([])
	const ready = code.every(Boolean)
	const focus = (index: number) => inputs.current[index]?.focus()

	const cellProps = (index: number) => ({
		ref: (element: HTMLInputElement | null) => {
			inputs.current[index] = element
		},
		value: code[index],
		onChange: (event: { target: { value: string } }) => {
			const digit = event.target.value.replace(/\D/g, '').slice(-1)
			setCode(current => current.map((d, i) => (i === index ? digit : d)))
			if (digit && index < LENGTH - 1) focus(index + 1)
		},
		onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Backspace' && !code[index] && index > 0)
				focus(index - 1)
		},
		onPaste: (event: ClipboardEvent<HTMLInputElement>) => {
			const digits = event.clipboardData
				.getData('text')
				.replace(/\D/g, '')
				.slice(0, LENGTH)
			if (!digits) return
			event.preventDefault()
			setCode(Array.from({ length: LENGTH }, (_, i) => digits[i] ?? ''))
			focus(Math.min(digits.length, LENGTH - 1))
		},
	})

	return {
		cells: code.map((digit, index) => ({
			index,
			filled: !!digit,
			props: cellProps(index),
		})),
		ready,
		onSubmit: (event: SyntheticEvent) => {
			event.preventDefault()
			if (ready) router.push(ROUTES.dashboard)
		},
	}
}
