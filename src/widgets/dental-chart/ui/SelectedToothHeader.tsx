import { useTranslations } from 'next-intl'

import { Overline } from '@/shared/ui/overline'

type TSelectedToothHeaderProps = {
	toothNumber: number
	toothName: string
}

export function SelectedToothHeader({
	toothNumber,
	toothName,
}: TSelectedToothHeaderProps) {
	const t = useTranslations('DentalChart')

	return (
		<div className='flex items-center gap-3'>
			<span className='flex size-13 shrink-0 items-center justify-center rounded-[14px] bg-brand font-mono text-xl font-semibold text-on-brand shadow-brand'>
				{toothNumber}
			</span>
			<div className='min-w-0'>
				<Overline>{t('selectedTooth')}</Overline>
				<div className='font-display text-base leading-5.5 font-bold'>
					{toothName}
				</div>
			</div>
		</div>
	)
}
