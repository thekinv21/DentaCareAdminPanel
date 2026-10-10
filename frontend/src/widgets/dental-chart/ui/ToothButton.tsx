'use client'

import { memo } from 'react'

import { cn } from '@/shared/lib/cn'

import type { TSurface, TToothState } from '../model/Teeth'
import { useToothLabels } from '../model/useToothLabels'
import { ToothSvg } from './ToothSvg'

type TToothButtonProps = {
	toothNumber: number
	isUpper: boolean
	isSelected: boolean
	toothState: TToothState
	onPickTooth: (toothNumber: number) => void
	onPickSurface: (toothNumber: number, surface: TSurface) => void
}

/**
 * One tooth of the chart. Memoized: a click re-renders only the teeth whose
 * state or selection changed, not all 32 SVGs.
 */
export const ToothButton = memo(function ToothButton(props: TToothButtonProps) {
	const {
		toothNumber,
		isUpper,
		isSelected,
		toothState,
		onPickTooth,
		onPickSurface,
	} = props

	const labels = useToothLabels()
	const numberLabel = (
		<span
			className={cn(
				'font-mono text-[11.5px] leading-3.5 font-semibold',
				isSelected ? 'text-brand-strong' : 'text-ink-muted',
			)}
		>
			{toothNumber}
		</span>
	)

	return (
		<button
			type='button'
			onClick={() => onPickTooth(toothNumber)}
			aria-pressed={isSelected}
			aria-label={labels.toothLabel(toothNumber, toothState)}
			className={cn(
				'flex min-w-0 flex-col items-center gap-0.75 rounded-xl border-0 px-px py-1 transition-[background-color,box-shadow] duration-150',
				isSelected
					? 'bg-brand-soft shadow-[0_0_0_2px_var(--brand)]'
					: 'bg-transparent hover:bg-raised',
			)}
		>
			{!isUpper && numberLabel}
			<ToothSvg
				toothNumber={toothNumber}
				isUpper={isUpper}
				toothState={toothState}
				surfaceTitle={(surface, nameKey) =>
					labels.surfaceTitle(toothState, surface, nameKey)
				}
				onPickSurface={surface => onPickSurface(toothNumber, surface)}
			/>
			{isUpper && numberLabel}
		</button>
	)
})
