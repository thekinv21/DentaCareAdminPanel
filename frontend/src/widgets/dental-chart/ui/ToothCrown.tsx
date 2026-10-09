import type { MouseEvent } from 'react'

import type { TToothShape } from '../lib/ToothShape'
import type { TSurface, TSurfaceFinding, TToothState } from '../model/Teeth'
import { ToothMarks } from './ToothMarks'

type TToothCrownProps = {
	shape: TToothShape
	state: TToothState
	surfaceTitle: (surface: TSurface, anteriorName?: string) => string
	onPickSurface: (surface: TSurface) => void
}

const SURFACE_CLASS =
	'cursor-pointer transition-opacity duration-100 hover:opacity-70'

const findingFill = (finding?: TSurfaceFinding) =>
	finding === 'car'
		? 'var(--caries)'
		: finding === 'fill'
			? 'var(--info)'
			: 'transparent'

function crownFill({ missing, crown }: TToothState) {
	if (missing) return 'transparent'
	return crown ? 'var(--info-soft)' : 'var(--enamel)'
}

/**
 * Crown circle split into clickable surfaces, with treatment marks on top
 */
export function ToothCrown(props: TToothCrownProps) {
	const { shape, state, surfaceTitle, onPickSurface } = props

	const visible = !state.missing

	const pick = (surface: TSurface) => (event: MouseEvent) => {
		event.stopPropagation()
		onPickSurface(surface)
	}

	const surfaceFill = (surface: TSurface) =>
		visible ? findingFill(state.surfaces[surface]) : 'transparent'

	return (
		<>
			<circle
				cx='20'
				cy={shape.cy}
				r='17'
				fill={crownFill(state)}
				stroke='var(--enamel-deep)'
				strokeWidth='1'
				strokeDasharray={state.missing ? '3 3' : undefined}
			/>
			{shape.sides.map(({ surface, d }) => (
				<path
					key={surface}
					d={d}
					fill={surfaceFill(surface)}
					stroke='var(--enamel-deep)'
					strokeWidth='.8'
					className={SURFACE_CLASS}
					onClick={pick(surface)}
				>
					<title>{surfaceTitle(surface)}</title>
				</path>
			))}
			<path
				d={shape.centre}
				fill={surfaceFill('c')}
				stroke='var(--enamel-deep)'
				strokeWidth='.8'
				className={SURFACE_CLASS}
				onClick={pick('c')}
			>
				<title>
					{surfaceTitle('c', shape.anterior ? 'incisalEdge' : undefined)}
				</title>
			</path>
			{visible && (
				<ToothMarks state={state} cy={shape.cy} cross={shape.cross} />
			)}
		</>
	)
}
