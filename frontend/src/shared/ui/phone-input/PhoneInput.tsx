import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/cn'
import { inputLgClass } from '@/shared/ui/field'

type PhoneInputProps = Omit<ComponentProps<'input'>, 'type'>

/**
 * Kyrgyz phone number with a fixed +996 prefix
 */
export function PhoneInput({ className, ...props }: PhoneInputProps) {
	return (
		<div className='relative flex items-center'>
			<span className='pointer-events-none absolute left-3.5 font-mono text-[15px] text-ink-muted'>
				+996
			</span>
			<input
				type='tel'
				inputMode='tel'
				className={cn(inputLgClass, 'pl-[62px] font-mono', className)}
				{...props}
			/>
		</div>
	)
}
