import type { TToothState } from '../model/Teeth'

type TToothMarksProps = {
	state: TToothState
	cy: number
	cross: string
}

export function ToothMarks({ state, cy, cross }: TToothMarksProps) {
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
