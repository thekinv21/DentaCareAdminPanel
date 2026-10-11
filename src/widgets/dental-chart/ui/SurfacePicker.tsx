'use client'

import { useTranslations } from 'next-intl'

import { Overline } from '@/shared/ui/overline'

import { findingLabel } from '../model/ChartLogic'
import { SURFACE_NAME, SURFACES } from '../model/Teeth'
import type { TDentalChartModel } from '../model/useDentalChart'
import { SurfaceButton } from './SurfaceButton'

type TSurfacePickerProps = { chartModel: TDentalChartModel }

/**
 * Surfaces of the selected tooth; each click cycles healthy → caries → filling
 */
export function SurfacePicker({ chartModel }: TSurfacePickerProps) {
	const t = useTranslations('DentalChart')

	return (
		<div>
			<Overline className='mb-2'>{t('surfacesClickToChange')}</Overline>
			<div role='group' aria-label={t('surfaces')} className='flex gap-1.5'>
				{SURFACES.map(surface => {
					const finding = chartModel.selectedState.surfaces[surface]
					const findingText = t(
						finding ? findingLabel(finding) : 'normalSurface',
					)
					return (
						<SurfaceButton
							key={surface}
							abbreviation={chartModel.surfaceAbbreviation(surface)}
							label={`${t(SURFACE_NAME[surface])}: ${findingText}`}
							finding={finding}
							onClick={() => chartModel.cycleSurface(surface)}
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
