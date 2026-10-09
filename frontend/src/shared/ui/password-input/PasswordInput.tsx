'use client'

import { type ComponentProps, useState } from 'react'

import { Eye, EyeOff } from 'lucide-react'

import { cn } from '@/shared/lib/cn'
import { useI18n } from '@/shared/lib/i18n'
import { inputLgClass } from '@/shared/ui/field'

type PasswordInputProps = Omit<ComponentProps<'input'>, 'type'>

/**
 * Password field with a show/hide toggle
 */
export function PasswordInput({ className, ...props }: PasswordInputProps) {
	const { t } = useI18n()
	const [visible, setVisible] = useState(false)
	return (
		<div className='relative flex items-center'>
			<input
				type={visible ? 'text' : 'password'}
				className={cn(inputLgClass, 'pr-[52px]', className)}
				{...props}
			/>
			<button
				type='button'
				aria-label={t(visible ? 'Скрыть пароль' : 'Показать пароль')}
				aria-pressed={visible}
				onClick={() => setVisible(current => !current)}
				className='absolute right-1 flex size-10 items-center justify-center rounded-[10px] border-0 bg-transparent text-ink-muted hover:bg-raised hover:text-ink'
			>
				{visible ? (
					<Eye size={20} aria-hidden='true' />
				) : (
					<EyeOff size={20} aria-hidden='true' />
				)}
			</button>
		</div>
	)
}
