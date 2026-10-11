'use client'

import { useTranslations } from 'next-intl'

import { Segmented } from '@/shared/ui/segmented'

import type { TDentition } from '../model/Teeth'

type TDentitionSwitchProps = {
	value: TDentition
	onChange: (dentition: TDentition) => void
}

export function DentitionSwitch({ value, onChange }: TDentitionSwitchProps) {
	const t = useTranslations('DentalChart')
	return (
		<Segmented
			aria-label={t('bite')}
			options={[
				{ id: 'permanent', label: t('permanent') },
				{ id: 'primary', label: t('primary') },
			]}
			value={value}
			onChange={onChange}
		/>
	)
}
