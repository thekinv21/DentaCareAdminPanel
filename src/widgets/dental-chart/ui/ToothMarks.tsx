import type { TToothState } from '../model/Teeth'

type TToothMarksProps = {
	toothState: TToothState
	cy: number
	crossPath: string
}

export function ToothMarks({ toothState, cy, crossPath }: TToothMarksProps) {
	return (
		<>
			{toothState.crown && (
				<circle
					cx='20'
					cy={cy}
					r='17.5'
					fill='none'
					stroke='var(--info)'
					strokeWidth='3'
				/>
			)}
			{toothState.plan && (
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
			{toothState.extract && (
				<path
					d={crossPath}
					stroke='var(--accent)'
					strokeWidth='3'
					strokeLinecap='round'
				/>
			)}
		</>
	)
}
