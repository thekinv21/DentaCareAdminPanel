'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/shared/ui/button'

import type { TSettingsModel } from '../model/useSettings'

type TSettingsSectionHeaderProps = {
	current: TSettingsModel['current']
	/**
	 * Shown on the price list: opens the new service modal
	 */
	onAddService?: () => void
}

export function SettingsSectionHeader({
	current,
	onAddService,
}: TSettingsSectionHeaderProps) {
	const t = useTranslations('Settings')

	return (
		<div className='flex flex-wrap items-center justify-between gap-2.5'>
			<div>
				<h2 className='font-display text-[17px] leading-6 font-bold tracking-[-0.01em]'>
					{current.label}
				</h2>
				<p className='text-[12.5px] leading-4.5 text-ink-muted'>
					{current.description}
				</p>
			</div>
			{onAddService && (
				<div className='flex gap-2'>
					{/* price list import comes with the backend */}
					<Button size='sm' disabled>
						{t('importPriceList')}
					</Button>
					<Button size='sm' variant='primary' onClick={onAddService}>
						{t('addService')}
					</Button>
				</div>
			)}
		</div>
	)
}
