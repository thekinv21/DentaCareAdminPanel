import type { SVGProps } from 'react'

type TToothIconProps = SVGProps<SVGSVGElement> & { size?: number }

/**
 * Denta tooth mark (stroke icon, follows currentColor)
 */
export function ToothIcon({ size = 20, ...props }: TToothIconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={1.8}
			strokeLinecap='round'
			strokeLinejoin='round'
			aria-hidden='true'
			{...props}
		>
			<path d='M7 3c-2.5 0-4 2-4 4.5 0 3 1.5 4.5 2 7 .5 3 1 6.5 3 6.5 1.6 0 1.8-2.6 2.2-4.5.3-1.3.9-2 1.8-2s1.5.7 1.8 2c.4 1.9.6 4.5 2.2 4.5 2 0 2.5-3.5 3-6.5.5-2.5 2-4 2-7C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3z' />
		</svg>
	)
}
