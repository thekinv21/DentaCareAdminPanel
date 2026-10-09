import type { MouseEvent } from 'react'

import { toothShape } from '../lib/ToothShape'
import type { Surface, SurfaceFinding, ToothState } from '../model/Teeth'
import { ToothMarks } from './ToothMarks'

interface ToothSvgProps {
	n: number
	upper: boolean
	state: ToothState
	surfaceTitle: (surface: Surface, anteriorName?: string) => string
	onPickSurface: (surface: Surface) => void
}

const fillOf = (finding?: SurfaceFinding) =>
	finding === 'car'
		? 'var(--caries)'
		: finding === 'fill'
			? 'var(--info)'
			: 'transparent'

const surfaceClass =
	'cursor-pointer transition-opacity duration-100 hover:opacity-70'

export function ToothSvg({
	n,
	upper,
	state,
	surfaceTitle,
	onPickSurface,
}: ToothSvgProps) {
	const { missing, implant } = state
	const shape = toothShape(n, upper, !!(missing || implant))
	const visible = !missing

	const pick = (surface: Surface) => (event: MouseEvent) => {
		event.stopPropagation()
		onPickSurface(surface)
	}

	return (
		<svg
			viewBox='0 0 40 96'
			aria-hidden='true'
			className='block h-auto w-full max-w-11.5 overflow-visible'
		>
			<g opacity={missing ? 0.45 : 1}>
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
				{implant && visible && (
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
				<circle
					cx='20'
					cy={shape.cy}
					r='17'
					fill={
						missing
							? 'transparent'
							: state.crown
								? 'var(--info-soft)'
								: 'var(--enamel)'
					}
					stroke='var(--enamel-deep)'
					strokeWidth='1'
					strokeDasharray={missing ? '3 3' : undefined}
				/>
				{shape.sides.map(({ surface, d }) => (
					<path
						key={surface}
						d={d}
						fill={visible ? fillOf(state.surfaces[surface]) : 'transparent'}
						stroke='var(--enamel-deep)'
						strokeWidth='.8'
						className={surfaceClass}
						onClick={pick(surface)}
					>
						<title>{surfaceTitle(surface)}</title>
					</path>
				))}
				<path
					d={shape.centre}
					fill={visible ? fillOf(state.surfaces.c) : 'transparent'}
					stroke='var(--enamel-deep)'
					strokeWidth='.8'
					className={surfaceClass}
					onClick={pick('c')}
				>
					<title>
						{surfaceTitle('c', shape.anterior ? 'incisalEdge' : undefined)}
					</title>
				</path>
				{visible && (
					<ToothMarks state={state} cy={shape.cy} cross={shape.cross} />
				)}
			</g>
		</svg>
	)
}
