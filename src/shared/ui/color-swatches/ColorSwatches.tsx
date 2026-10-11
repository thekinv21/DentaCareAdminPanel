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
	const { swatches, value, onChange, 'aria-label': ariaLabel } = props

	return (
		<div
			role='radiogroup'
			aria-label={ariaLabel}
			className='flex min-h-10 items-center gap-2'
		>
			{swatches.map(swatch => (
				<ColorSwatch
					key={swatch.color}
					swatch={swatch}
					isSelected={swatch.color === value}
					onSelect={() => onChange(swatch.color)}
				/>
			))}
		</div>
	)
}

type TColorSwatchProps = {
	swatch: TSwatch
	isSelected: boolean
	onSelect: () => void
}

function ColorSwatch({ swatch, isSelected, onSelect }: TColorSwatchProps) {
	const style: CSSProperties = {
		background: swatch.color,
		boxShadow: isSelected
			? `0 0 0 3px var(--surface), 0 0 0 5px ${swatch.color}`
			: 'none',
	}

	return (
		<button
			type='button'
			role='radio'
			aria-checked={isSelected}
			aria-label={swatch.name}
			onClick={onSelect}
			className='size-7 rounded-full border-0 p-0'
			style={style}
		/>
	)
}
