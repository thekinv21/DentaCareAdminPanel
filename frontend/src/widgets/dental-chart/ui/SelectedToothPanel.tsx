'use client'

import { cn } from '@/shared/lib/cn'
import { useI18n } from '@/shared/lib/i18n'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'

import { findingLabel } from '../model/chart-logic'
import { SURFACE_NAME, SURFACES } from '../model/teeth'
import type { DentalChartModel } from '../model/use-dental-chart'

const overline =
	'text-[11px] leading-[14px] font-semibold tracking-[0.06em] text-ink-muted uppercase'

export function SelectedToothPanel({ chart }: { chart: DentalChartModel }) {
	const { t } = useI18n()
	const { selected, selectedState } = chart

	return (
		<aside
			aria-label={t('Выбранный зуб')}
			className='flex max-w-[360px] min-w-0 flex-[1_1_280px] flex-col gap-3 rounded-[18px] border border-line bg-raised p-4 max-[720px]:max-w-none'
		>
			<div className='flex items-center gap-3'>
				<span className='flex size-[52px] shrink-0 items-center justify-center rounded-[14px] bg-brand font-mono text-xl font-semibold text-on-brand shadow-brand'>
					{selected}
				</span>
				<div className='min-w-0'>
					<div className={overline}>{t('Выбранный зуб')}</div>
					<div className='font-display text-base leading-[22px] font-bold'>
						{chart.toothName(selected)}
					</div>
				</div>
			</div>

			<div className='flex flex-wrap gap-1.5'>
				{chart.tags.map(tag => (
					<Badge key={tag.label} tone={tag.tone}>
						{tag.label}
					</Badge>
				))}
			</div>

			<div>
				<div className={cn(overline, 'mb-2')}>
					{t('Поверхности · нажмите для смены')}
				</div>
				<div
					role='group'
					aria-label={t('Поверхности')}
					className='flex gap-1.5'
				>
					{SURFACES.map(surface => {
						const finding = selectedState.surfaces[surface]
						const label = `${t(SURFACE_NAME[surface])}: ${t(finding ? findingLabel(finding) : 'норма')}`
						return (
							<button
								key={surface}
								type='button'
								aria-label={label}
								title={label}
								onClick={() => chart.cycleSurface(surface)}
								className={cn(
									'inline-flex size-9 items-center justify-center rounded-[10px] border-0 font-mono text-xs font-semibold transition-transform duration-150 active:scale-95',
									finding === 'car' && 'bg-caries text-white',
									finding === 'fill' && 'bg-info text-surface',
									!finding &&
										'bg-surface text-ink-muted shadow-[inset_0_0_0_1px_var(--line-strong)]',
								)}
							>
								{chart.surfaceShort(surface)}
							</button>
						)
					})}
				</div>
				<p className='mt-1.5 text-[12.5px] leading-[18px] text-ink-muted'>
					{t('Норма → кариес → пломба')}
				</p>
			</div>

			<p className='rounded-xl border border-line bg-surface px-3 py-2.5 text-[13px] leading-[19px]'>
				{chart.note}
			</p>

			<div className='mt-auto flex gap-2'>
				<Button size='sm' className='flex-1' onClick={chart.clearSelected}>
					{t('Очистить')}
				</Button>
				<Button size='sm' variant='primary' className='flex-1'>
					{t('В план лечения')}
				</Button>
			</div>
		</aside>
	)
}
