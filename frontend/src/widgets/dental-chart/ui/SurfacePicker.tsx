'use client'

import { useTranslations } from 'next-intl'

import { findingLabel } from '../model/ChartLogic'
import { SURFACE_NAME, SURFACES } from '../model/Teeth'
import type { TDentalChartModel } from '../model/useDentalChart'
import { Overline } from './Overline'
import { SurfaceButton } from './SurfaceButton'

type TSurfacePickerProps = { chart: TDentalChartModel }

export function SurfacePicker({ chart }: TSurfacePickerProps) {
	const t = useTranslations('DentalChart')

	return (
		<div>
			<Overline className='mb-2'>{t('surfacesClickToChange')}</Overline>
			<div role='group' aria-label={t('surfaces')} className='flex gap-1.5'>
				{SURFACES.map(surface => {
					const finding = chart.selectedState.surfaces[surface]
					const state = t(finding ? findingLabel(finding) : 'normalSurface')
					return (
						<SurfaceButton
							key={surface}
							short={chart.surfaceShort(surface)}
							label={`${t(SURFACE_NAME[surface])}: ${state}`}
							finding={finding}
							onClick={() => chart.cycleSurface(surface)}
						/>
					)
				})}
			</div>
			<p className='mt-1.5 text-[12.5px] leading-4.5 text-ink-muted'>
				{t('healthyCariesFilling')}
			</p>
		</div>
	)
}
