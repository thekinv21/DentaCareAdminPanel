import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { Overline } from '@/shared/ui/overline'

type TQuadrantLabelsProps = {
	/**
	 * Quadrant numbers in FDI order: upper right, upper left, lower left, lower right
	 */
	quadrants: number[]
	position: 'upper' | 'lower'
}

export function QuadrantLabels({ quadrants, position }: TQuadrantLabelsProps) {
	const t = useTranslations('DentalChart')
	const [upperRight, upperLeft, lowerLeft, lowerRight] = quadrants
	const isUpper = position === 'upper'

	return (
		<Overline
			className={cn(
				'flex justify-between px-1.5',
				isUpper ? 'pb-1.5' : 'pt-1.5',
			)}
		>
			<span>
				{isUpper
					? `${t('upperRight')} · ${upperRight}`
					: `${t('lowerRight')} · ${lowerRight}`}
			</span>
			<span>
				{isUpper
					? `${upperLeft} · ${t('upperLeft')}`
					: `${lowerLeft} · ${t('lowerLeft')}`}
			</span>
		</Overline>
	)
}
