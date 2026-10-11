'use client'

import { Download, Funnel } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/shared/ui/button'
import { SearchInput } from '@/shared/ui/search-input'
import { SegmentedField } from '@/shared/ui/segmented'

import type { TPatientsTableModel } from '../model/usePatientsTable'

type TPatientsToolbarProps = { table: TPatientsTableModel }

/**
 * Segment tabs, search and the list tools above the patient table
 */
export function PatientsToolbar({ table }: TPatientsToolbarProps) {
	const t = useTranslations('Patients')
	const { control, register } = table.filters

	return (
		<div className='flex flex-wrap items-center justify-between gap-2.5'>
			<SegmentedField
				control={control}
				name='tab'
				aria-label={t('segments')}
				options={table.tabs}
			/>
			<div className='flex flex-wrap gap-2 lg:flex-nowrap'>
				<SearchInput
					label={t('nameIdOrPhone')}
					size='sm'
					className='basis-60'
					{...register('search')}
				/>
				{/* the dentist filter and export come with the backend */}
				<Button size='sm' className='h-9' disabled>
					<Funnel size={15} aria-hidden='true' />
					{t('dentist')}
				</Button>
				<Button size='sm' className='h-9' disabled>
					<Download size={15} aria-hidden='true' />
					{t('export')}
				</Button>
			</div>
		</div>
	)
}
