import type { MouseEvent } from 'react'

import type { TToothShape } from '../lib/ToothShape'
import type { TSurface, TSurfaceFinding, TToothState } from '../model/Teeth'
import { ToothMarks } from './ToothMarks'

type TToothCrownProps = {
	shape: TToothShape
	toothState: TToothState
	surfaceTitle: (surface: TSurface, nameKey?: string) => string
	onPickSurface: (surface: TSurface) => void
}

const FINDING_FILL: Record<TSurfaceFinding, string> = {
	car: 'var(--caries)',
	fill: 'var(--info)',
}

function crownFill({ missing, crown }: TToothState) {
	if (missing) return 'transparent'
	return crown ? 'var(--info-soft)' : 'var(--enamel)'
}

/**
 * Crown circle split into clickable surfaces, with treatment marks on top
 */
export function ToothCrown(props: TToothCrownProps) {
	const { shape, toothState, surfaceTitle, onPickSurface } = props

	const isVisible = !toothState.missing
	const fillOf = (surface: TSurface) => {
		const finding = toothState.surfaces[surface]
		return isVisible && finding ? FINDING_FILL[finding] : 'transparent'
	}

	return (
		<>
			<circle
				cx='20'
				cy={shape.cy}
				r='17'
				fill={crownFill(toothState)}
				stroke='var(--enamel-deep)'
				strokeWidth='1'
				strokeDasharray={toothState.missing ? '3 3' : undefined}
			/>
			{shape.sides.map(side => (
				<SurfacePath
					key={side.surface}
					path={side.path}
					fill={fillOf(side.surface)}
					title={surfaceTitle(side.surface)}
					onPick={() => onPickSurface(side.surface)}
				/>
			))}
			<SurfacePath
				path={shape.centre}
				fill={fillOf('c')}
				title={surfaceTitle('c', shape.isAnterior ? 'incisalEdge' : undefined)}
				onPick={() => onPickSurface('c')}
			/>
			{isVisible && (
				<ToothMarks
					toothState={toothState}
					cy={shape.cy}
					crossPath={shape.cross}
				/>
			)}
		</>
	)
}

type TSurfacePathProps = {
	path: string
	fill: string
	title: string
	onPick: () => void
}

function SurfacePath({ path, fill, title, onPick }: TSurfacePathProps) {
	const pick = (event: MouseEvent) => {
		// the surface click must not also count as a click on the whole tooth
		event.stopPropagation()
		onPick()
	}

	return (
		<path
			d={path}
			fill={fill}
			stroke='var(--enamel-deep)'
			strokeWidth='.8'
			className='cursor-pointer transition-opacity duration-100 hover:opacity-70'
			onClick={pick}
		>
			<title>{title}</title>
		</path>
	)
}
