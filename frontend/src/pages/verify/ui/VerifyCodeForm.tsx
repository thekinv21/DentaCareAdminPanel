'use client'

import {
	type ClipboardEvent,
	type KeyboardEvent,
	type SyntheticEvent,
	useRef,
	useState,
} from 'react'

import { useRouter } from 'next/navigation'

import { cn } from '@/shared/lib/cn'
import { ROUTES } from '@/shared/routes'
import { Button } from '@/shared/ui/button'
import { inputLgClass } from '@/shared/ui/field'

const LENGTH = 6

export function VerifyCodeForm() {
	const router = useRouter()
	const [code, setCode] = useState<string[]>(Array(LENGTH).fill(''))
	const inputs = useRef<(HTMLInputElement | null)[]>([])
	const ready = code.every(Boolean)

	const setDigit = (index: number, value: string) => {
		const digit = value.replace(/\D/g, '').slice(-1)
		setCode(current => current.map((d, i) => (i === index ? digit : d)))
		if (digit && index < LENGTH - 1) inputs.current[index + 1]?.focus()
	}

	const onKeyDown =
		(index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Backspace' && !code[index] && index > 0)
				inputs.current[index - 1]?.focus()
		}

	const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
		const digits = event.clipboardData
			.getData('text')
			.replace(/\D/g, '')
			.slice(0, LENGTH)
		if (!digits) return
		event.preventDefault()
		setCode(Array.from({ length: LENGTH }, (_, i) => digits[i] ?? ''))
		inputs.current[Math.min(digits.length, LENGTH - 1)]?.focus()
	}

	// No backend yet: any complete code signs in
	const onSubmit = (event: SyntheticEvent) => {
		event.preventDefault()
		if (ready) router.push(ROUTES.dashboard)
	}

	return (
		<form onSubmit={onSubmit} className='flex flex-col gap-[18px]'>
			<fieldset className='m-0 border-0 p-0'>
				<legend className='mb-2 text-[13px] leading-[18px] font-semibold'>
					Код подтверждения
				</legend>
				<div className='grid grid-cols-6 gap-2'>
					{code.map((digit, index) => (
						<input
							key={index}
							ref={element => {
								inputs.current[index] = element
							}}
							inputMode='numeric'
							autoComplete={index === 0 ? 'one-time-code' : 'off'}
							maxLength={1}
							aria-label={`Цифра ${index + 1}`}
							value={digit}
							onChange={event => setDigit(index, event.target.value)}
							onKeyDown={onKeyDown(index)}
							onPaste={onPaste}
							className={cn(
								inputLgClass,
								'h-[60px] p-0 text-center font-mono text-2xl font-semibold',
								digit && 'border-brand',
							)}
						/>
					))}
				</div>
			</fieldset>
			<label className='inline-flex cursor-pointer items-start gap-2.5 text-sm leading-5'>
				<input
					type='checkbox'
					defaultChecked
					className='mt-px size-[18px] shrink-0 accent-brand'
				/>
				Не спрашивать код на этом устройстве 30 дней
			</label>
			<Button type='submit' variant='primary' size='lg' block disabled={!ready}>
				Подтвердить и войти
			</Button>
		</form>
	)
}
