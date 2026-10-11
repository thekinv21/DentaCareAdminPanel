import type { ButtonHTMLAttributes } from 'react'

import {
	buttonClass,
	type TButtonSize,
	type TButtonVariant,
} from './ButtonClass'

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: TButtonVariant
	size?: TButtonSize
	block?: boolean
}

export function Button(props: TButtonProps) {
	const { variant, size, block, className, type = 'button', ...rest } = props

	return (
		<button
			type={type}
			className={buttonClass({ variant, size, block, className })}
			{...rest}
		/>
	)
}
