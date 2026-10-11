import type { TToothShape } from '../lib/ToothShape'
import type { TToothState } from '../model/Teeth'

type TToothRootsProps = {
	shape: TToothShape
	toothState: TToothState
}

export function ToothRoots({ shape, toothState }: TToothRootsProps) {
	return (
		<>
			{shape.roots.map(rootPath => (
				<path
					key={rootPath}
					d={rootPath}
					fill='var(--enamel-shade)'
					stroke='var(--enamel-deep)'
					strokeWidth='1'
				/>
			))}
			{toothState.endo &&
				shape.canals.map(canalPath => (
					<path
						key={canalPath}
						d={canalPath}
						stroke='var(--danger)'
						strokeWidth='2.4'
						strokeLinecap='round'
						fill='none'
					/>
				))}
			{toothState.implant && !toothState.missing && (
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
