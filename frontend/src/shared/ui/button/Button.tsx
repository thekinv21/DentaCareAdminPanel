import type { ButtonHTMLAttributes } from 'react'

import { buttonClass, type ButtonSize, type ButtonVariant } from './ButtonClass'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant
	size?: ButtonSize
	block?: boolean
}

export function Button({
	variant,
	size,
	block,
	className,
	type = 'button',
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			className={buttonClass({ variant, size, block, className })}
			{...props}
		/>
	)
}
