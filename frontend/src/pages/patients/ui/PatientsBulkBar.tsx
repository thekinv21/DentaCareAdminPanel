'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/shared/ui/button'

import type { TPatientsTableModel } from '../model/usePatientsTable'

type TPatientsBulkBarProps = { table: TPatientsTableModel }

/**
 * Actions for the checked patients; hidden while nothing is checked
 */

export function PatientsBulkBar({ table }: TPatientsBulkBarProps) {
	const t = useTranslations('Patients')
	if (table.selectedCount === 0) return null

	return (
		<div
			role='status'
			className='flex animate-pop flex-wrap items-center gap-2 rounded-xl bg-brand-soft py-1.5 pr-1.5 pl-3.5 text-brand-strong'
		>
			<span className='grow font-semibold'>
				{t('selected')} {table.selectedCount}
			</span>
			{/* bulk SMS and reassigning come with the backend */}
			<Button size='sm' variant='primary' disabled>
				{t('sendSms')}
			</Button>
			<Button size='sm' disabled>
				{t('assignDentist')}
			</Button>
			<Button size='sm' variant='danger' onClick={table.bulkDelete}>
				{t('deleteSelected')}
			</Button>
			<Button
				size='sm'
				variant='ghost'
				className='text-brand-strong'
				onClick={table.clearSelection}
			>
				{t('reset')}
			</Button>
		</div>
	)
}
