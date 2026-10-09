'use client'

import { useState } from 'react'

import { cn } from '@/shared/lib/cn'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardHeader } from '@/shared/ui/card'
import { Segmented } from '@/shared/ui/segmented'

import {
	applyTool,
	type ChartMap,
	type Dentition,
	findingLabel,
	INITIAL_CHART,
	PERMANENT_LOWER,
	PERMANENT_UPPER,
	PRIMARY_LOWER,
	PRIMARY_UPPER,
	summarize,
	type Surface,
	SURFACE_NAME,
	SURFACE_SHORT,
	SURFACES,
	type ToolId,
	TOOLS,
	TOOTH_NOTES,
	toothName,
	type ToothState,
	toothTags,
} from '../model/teeth'
import { Tooth } from './Tooth'

const EMPTY: ToothState = { surfaces: {} }

const DENTITIONS: { id: Dentition; label: string }[] = [
	{ id: 'permanent', label: 'Постоянные' },
	{ id: 'primary', label: 'Молочные' },
]

const SUMMARY: {
	key: keyof ReturnType<typeof summarize>
	label: string
	tool: ToolId
}[] = [
	{ key: 'car', label: 'Кариес', tool: 'car' },
	{ key: 'fill', label: 'Пломбы', tool: 'fill' },
	{ key: 'crown', label: 'Коронки', tool: 'crown' },
	{ key: 'endo', label: 'Каналы', tool: 'endo' },
	{ key: 'implant', label: 'Импланты', tool: 'implant' },
	{ key: 'extract', label: 'К удалению', tool: 'extract' },
	{ key: 'missing', label: 'Отсутствуют', tool: 'missing' },
]

const swatchOf = (tool: ToolId) =>
	TOOLS.find(item => item.id === tool)?.swatch ?? ''

function Swatch({ className }: { className: string }) {
	return <span className={cn('size-3.5 shrink-0 rounded', className)} />
}

export function DentalChart() {
	const [dentition, setDentition] = useState<Dentition>('permanent')
	const [tool, setTool] = useState<ToolId>('select')
	const [selected, setSelected] = useState(46)
	const [charts, setCharts] = useState<Record<Dentition, ChartMap>>({
		permanent: INITIAL_CHART,
		primary: {},
	})

	const chart = charts[dentition]
	const permanent = dentition === 'permanent'
	const upper = permanent ? PERMANENT_UPPER : PRIMARY_UPPER
	const lower = permanent ? PERMANENT_LOWER : PRIMARY_LOWER

	const updateTooth = (
		n: number,
		update: (tooth: ToothState) => ToothState,
	) => {
		setCharts(current => ({
			...current,
			[dentition]: {
				...current[dentition],
				[n]: update(current[dentition][n] ?? EMPTY),
			},
		}))
		setSelected(n)
	}

	const pickTooth = (n: number) => {
		if (tool === 'select') setSelected(n)
		else updateTooth(n, tooth => applyTool(tooth, tool))
	}

	const pickSurface = (n: number, surface: Surface) => {
		if (tool !== 'car' && tool !== 'fill') return pickTooth(n)
		updateTooth(n, tooth => ({
			...tooth,
			surfaces: {
				...tooth.surfaces,
				[surface]: tooth.surfaces[surface] === tool ? undefined : tool,
			},
		}))
	}

	const cycleSurface = (surface: Surface) =>
		updateTooth(selected, tooth => {
			const current = tooth.surfaces[surface]
			return {
				...tooth,
				surfaces: {
					...tooth.surfaces,
					[surface]: !current ? 'car' : current === 'car' ? 'fill' : undefined,
				},
			}
		})

	const switchDentition = (next: Dentition) => {
		setDentition(next)
		setSelected(next === 'permanent' ? 46 : 84)
	}

	const selectedState = chart[selected] ?? EMPTY
	const counts = summarize(chart)
	const gridStyle = {
		gridTemplateColumns: `repeat(${upper.length}, minmax(0, 1fr))`,
	}
	const note = permanent ? TOOTH_NOTES[selected] : undefined

	const renderArch = (teeth: number[], isUpper: boolean) =>
		teeth.map(n => (
			<Tooth
				key={n}
				n={n}
				upper={isUpper}
				state={chart[n] ?? EMPTY}
				selected={selected === n}
				onPick={() => pickTooth(n)}
				onPickSurface={surface => pickSurface(n, surface)}
			/>
		))

	return (
		<Card as='section' aria-label='Зубная формула' className='animate-fade'>
			<CardHeader
				title='Зубная формула'
				description='Нотация FDI · обновлено 12.09.2026 · выберите инструмент и нажмите на поверхность или зуб'
				actions={
					<Segmented
						aria-label='Прикус'
						options={DENTITIONS}
						value={dentition}
						onChange={switchDentition}
					/>
				}
			/>

			<div
				role='toolbar'
				aria-label='Инструменты разметки'
				className='flex flex-wrap gap-1.5'
			>
				{TOOLS.map(item => {
					const active = item.id === tool
					return (
						<button
							key={item.id}
							type='button'
							title={item.hint}
							aria-pressed={active}
							onClick={() => setTool(item.id)}
							className={cn(
								'inline-flex h-[34px] items-center gap-2 rounded-[10px] border px-2.5 text-[13px] font-semibold transition-[background-color,border-color,box-shadow] duration-150',
								active
									? 'border-brand bg-brand-soft text-brand-strong shadow-[0_0_0_1px_var(--brand)]'
									: 'border-line bg-surface hover:bg-raised',
							)}
						>
							<Swatch className={item.swatch} />
							{item.label}
						</button>
					)
				})}
			</div>

			<div className='flex flex-wrap items-start gap-4'>
				<div className='min-w-0 flex-[1_1_640px] overflow-x-auto'>
					<div
						className={cn(
							'mx-auto rounded-[18px] border border-line bg-raised px-2 py-3',
							permanent ? 'min-w-[640px]' : 'max-w-[560px] min-w-[420px]',
						)}
					>
						<div className='flex justify-between px-1.5 pb-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.06em] text-ink-muted uppercase'>
							<span>
								{permanent ? 'Верхняя правая · 1' : 'Верхняя правая · 5'}
							</span>
							<span>
								{permanent ? '2 · Верхняя левая' : '6 · Верхняя левая'}
							</span>
						</div>
						<div className='grid items-end gap-0.5' style={gridStyle}>
							{renderArch(upper, true)}
						</div>
						<div className='mx-1 my-1.5 h-px bg-line-strong opacity-60' />
						<div className='grid items-start gap-0.5' style={gridStyle}>
							{renderArch(lower, false)}
						</div>
						<div className='flex justify-between px-1.5 pt-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.06em] text-ink-muted uppercase'>
							<span>
								{permanent ? 'Нижняя правая · 4' : 'Нижняя правая · 8'}
							</span>
							<span>{permanent ? '3 · Нижняя левая' : '7 · Нижняя левая'}</span>
						</div>
					</div>
				</div>

				<aside
					aria-label='Выбранный зуб'
					className='flex max-w-[360px] min-w-0 flex-[1_1_280px] flex-col gap-3 rounded-[18px] border border-line bg-raised p-4 max-[720px]:max-w-none'
				>
					<div className='flex items-center gap-3'>
						<span className='flex size-[52px] shrink-0 items-center justify-center rounded-[14px] bg-brand font-mono text-xl font-semibold text-on-brand shadow-brand'>
							{selected}
						</span>
						<div className='min-w-0'>
							<div className='text-[11px] leading-[14px] font-semibold tracking-[0.06em] text-ink-muted uppercase'>
								Выбранный зуб
							</div>
							<div className='font-display text-base leading-[22px] font-bold'>
								{toothName(selected)}
							</div>
						</div>
					</div>

					<div className='flex flex-wrap gap-1.5'>
						{toothTags(selectedState).map(tag => (
							<Badge key={tag.label} tone={tag.tone}>
								{tag.label}
							</Badge>
						))}
					</div>

					<div>
						<div className='mb-2 text-[11px] leading-[14px] font-semibold tracking-[0.06em] text-ink-muted uppercase'>
							Поверхности · нажмите для смены
						</div>
						<div role='group' aria-label='Поверхности' className='flex gap-1.5'>
							{SURFACES.map(surface => {
								const finding = selectedState.surfaces[surface]
								const label = `${SURFACE_NAME[surface]}: ${finding ? findingLabel(finding) : 'норма'}`
								return (
									<button
										key={surface}
										type='button'
										aria-label={label}
										title={label}
										onClick={() => cycleSurface(surface)}
										className={cn(
											'inline-flex size-9 items-center justify-center rounded-[10px] border-0 font-mono text-xs font-semibold transition-transform duration-150 active:scale-95',
											finding === 'car' && 'bg-caries text-white',
											finding === 'fill' && 'bg-info text-surface',
											!finding &&
												'bg-surface text-ink-muted shadow-[inset_0_0_0_1px_var(--line-strong)]',
										)}
									>
										{SURFACE_SHORT[surface]}
									</button>
								)
							})}
						</div>
						<p className='mt-1.5 text-[12.5px] leading-[18px] text-ink-muted'>
							Норма → кариес → пломба
						</p>
					</div>

					<p className='rounded-xl border border-line bg-surface px-3 py-2.5 text-[13px] leading-[19px]'>
						{note ?? 'Заметок нет. Добавьте находку инструментами выше.'}
					</p>

					<div className='mt-auto flex gap-2'>
						<Button
							size='sm'
							className='flex-1'
							onClick={() => updateTooth(selected, () => ({ surfaces: {} }))}
						>
							Очистить
						</Button>
						<Button size='sm' variant='primary' className='flex-1'>
							В план лечения
						</Button>
					</div>
				</aside>
			</div>

			<ul className='flex flex-wrap gap-2 border-t border-line pt-3'>
				{SUMMARY.map(item => (
					<li
						key={item.key}
						className='inline-flex items-center gap-2 rounded-full bg-raised px-3 py-[5px] text-[13px]'
					>
						<Swatch className={swatchOf(item.tool)} />
						{item.label}
						<span className='font-mono font-semibold'>{counts[item.key]}</span>
					</li>
				))}
			</ul>
		</Card>
	)
}
