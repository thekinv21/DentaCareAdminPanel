import type { ToothState } from '../model/teeth'

interface ToothMarksProps {
	state: ToothState
	cy: number
	cross: string
}

/**
 * Crown ring, planned-treatment halo and extraction cross drawn over a tooth
 */
export function ToothMarks({ state, cy, cross }: ToothMarksProps) {
	return (
		<>
			{state.crown && (
				<circle
					cx='20'
					cy={cy}
					r='17.5'
					fill='none'
					stroke='var(--info)'
					strokeWidth='3'
				/>
			)}
			{state.plan && (
				<circle
					cx='20'
					cy={cy}
					r='20.5'
					fill='none'
					stroke='var(--accent)'
					strokeWidth='1.6'
					strokeDasharray='3 2.5'
				/>
			)}
			{state.extract && (
				<path
					d={cross}
					stroke='var(--accent)'
					strokeWidth='3'
					strokeLinecap='round'
				/>
			)}
		</>
	)
}
