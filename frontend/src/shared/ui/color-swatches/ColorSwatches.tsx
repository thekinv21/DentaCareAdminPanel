'use client'

import type { CSSProperties } from 'react'

type TSwatch = { color: string; name: string }

type TColorSwatchesProps = {
	swatches: TSwatch[]
	value: string
	onChange: (color: string) => void
	'aria-label': string
}

/**
 * Round color picks with a ring around the selected one
 */
export function ColorSwatches(props: TColorSwatchesProps) {
	const { swatches, value, onChange, ...rest } = props

	return (
		<div
			role='radiogroup'
			aria-label={rest['aria-label']}
			className='flex min-h-10 items-center gap-2'
		>
			{swatches.map(swatch => {
				const selected = swatch.color === value
				const style: CSSProperties = {
					background: swatch.color,
					boxShadow: selected
						? `0 0 0 3px var(--surface), 0 0 0 5px ${swatch.color}`
						: 'none',
				}
				return (
					<button
						key={swatch.color}
						type='button'
						role='radio'
						aria-checked={selected}
						aria-label={swatch.name}
						onClick={() => onChange(swatch.color)}
						className='size-7 rounded-full border-0 p-0'
						style={style}
					/>
				)
			})}
		</div>
	)
}
