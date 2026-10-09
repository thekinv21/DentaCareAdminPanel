import type { TToothShape } from '../lib/ToothShape'
import type { TToothState } from '../model/Teeth'

type TToothRootsProps = {
	shape: TToothShape
	state: TToothState
}

export function ToothRoots({ shape, state }: TToothRootsProps) {
	return (
		<>
			{shape.roots.map(d => (
				<path
					key={d}
					d={d}
					fill='var(--enamel-shade)'
					stroke='var(--enamel-deep)'
					strokeWidth='1'
				/>
			))}
			{state.endo &&
				shape.canals.map(d => (
					<path
						key={d}
						d={d}
						stroke='var(--danger)'
						strokeWidth='2.4'
						strokeLinecap='round'
						fill='none'
					/>
				))}
			{state.implant && !state.missing && (
				<>
					<path
						d={shape.implant.screw}
						fill='var(--sunken)'
						stroke='var(--ink-muted)'
						strokeWidth='1.2'
					/>
					<path
						d={shape.implant.threads}
						stroke='var(--ink-muted)'
						strokeWidth='1.2'
						fill='none'
					/>
				</>
			)}
		</>
	)
}
