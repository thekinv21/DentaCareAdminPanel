import type { MouseEvent } from 'react'

import { cn } from '@/shared/lib/cn'

import {
	centrePath,
	crossPath,
	implantPaths,
	rootPaths,
	sectorPath,
} from '../lib/geometry'
import {
	findingLabel,
	type Surface,
	SURFACE_NAME,
	type SurfaceFinding,
	toothFlags,
	toothName,
	type ToothState,
} from '../model/teeth'

interface ToothProps {
	n: number
	upper: boolean
	state: ToothState
	selected: boolean
	onPick: () => void
	onPickSurface: (surface: Surface) => void
}

const fillOf = (finding?: SurfaceFinding) =>
	finding === 'car'
		? 'var(--caries)'
		: finding === 'fill'
			? 'var(--info)'
			: 'transparent'

export function Tooth({
	n,
	upper,
	state,
	selected,
	onPick,
	onPickSurface,
}: ToothProps) {
	const quadrant = Math.floor(n / 10)
	const position = n % 10
	const cy = upper ? 74 : 22
	const leftIsMesial = [2, 3, 6, 7].includes(quadrant)
	const anterior = position <= 3

	const sides: [Surface, number, number][] = [
		[upper ? 'b' : 'o', -135, -45],
		[leftIsMesial ? 'd' : 'm', -45, 45],
		[upper ? 'o' : 'b', 45, 135],
		[leftIsMesial ? 'm' : 'd', 135, 225],
	]

	const { missing, implant } = state
	const { roots, canals } =
		missing || implant ? { roots: [], canals: [] } : rootPaths(n, upper)
	const screw = implantPaths(upper)
	const flags = toothFlags(state)

	const surfaceTitle = (surface: Surface, name = SURFACE_NAME[surface]) => {
		const finding = state.surfaces[surface]
		return finding ? `${name} · ${findingLabel(finding)}` : name
	}

	const pickSurface = (surface: Surface) => (event: MouseEvent) => {
		event.stopPropagation()
		onPickSurface(surface)
	}

	const number = (
		<span
			className={cn(
				'font-mono text-[11.5px] leading-[14px] font-semibold',
				selected ? 'text-brand-strong' : 'text-ink-muted',
			)}
		>
			{n}
		</span>
	)

	return (
		<button
			type='button'
			onClick={onPick}
			aria-pressed={selected}
			aria-label={`Зуб ${n}, ${toothName(n)}, ${flags.length ? flags.join(', ') : 'здоров'}`}
			className={cn(
				'flex min-w-0 flex-col items-center gap-[3px] rounded-xl border-0 px-px py-1 transition-[background-color,box-shadow] duration-150',
				selected
					? 'bg-brand-soft shadow-[0_0_0_2px_var(--brand)]'
					: 'bg-transparent hover:bg-raised',
			)}
		>
			{!upper && number}
			<svg
				viewBox='0 0 40 96'
				aria-hidden='true'
				className='block h-auto w-full max-w-[46px] overflow-visible'
			>
				<g opacity={missing ? 0.45 : 1}>
					{roots.map(d => (
						<path
							key={d}
							d={d}
							fill='var(--enamel-shade)'
							stroke='var(--enamel-deep)'
							strokeWidth='1'
						/>
					))}
					{state.endo &&
						canals.map(d => (
							<path
								key={d}
								d={d}
								stroke='var(--danger)'
								strokeWidth='2.4'
								strokeLinecap='round'
								fill='none'
							/>
						))}
					{implant && !missing && (
						<>
							<path
								d={screw.screw}
								fill='var(--sunken)'
								stroke='var(--ink-muted)'
								strokeWidth='1.2'
							/>
							<path
								d={screw.threads}
								stroke='var(--ink-muted)'
								strokeWidth='1.2'
								fill='none'
							/>
						</>
					)}
					<circle
						cx='20'
						cy={cy}
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
					{sides.map(([surface, from, to]) => (
						<path
							key={surface}
							d={sectorPath(cy, from, to)}
							fill={missing ? 'transparent' : fillOf(state.surfaces[surface])}
							stroke='var(--enamel-deep)'
							strokeWidth='.8'
							className='cursor-pointer transition-opacity duration-100 hover:opacity-70'
							onClick={pickSurface(surface)}
						>
							<title>{surfaceTitle(surface)}</title>
						</path>
					))}
					<path
						d={centrePath(cy)}
						fill={missing ? 'transparent' : fillOf(state.surfaces.c)}
						stroke='var(--enamel-deep)'
						strokeWidth='.8'
						className='cursor-pointer transition-opacity duration-100 hover:opacity-70'
						onClick={pickSurface('c')}
					>
						<title>
							{surfaceTitle('c', anterior ? 'Режущий край' : 'Жевательная')}
						</title>
					</path>
					{state.crown && !missing && (
						<circle
							cx='20'
							cy={cy}
							r='17.5'
							fill='none'
							stroke='var(--info)'
							strokeWidth='3'
						/>
					)}
					{state.plan && !missing && (
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
					{state.extract && !missing && (
						<path
							d={crossPath(cy)}
							stroke='var(--accent)'
							strokeWidth='3'
							strokeLinecap='round'
						/>
					)}
				</g>
			</svg>
			{upper && number}
		</button>
	)
}
