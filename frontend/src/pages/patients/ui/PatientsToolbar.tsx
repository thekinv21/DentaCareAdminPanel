'use client'

import { Download, Funnel } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/shared/ui/button'
import { SearchInput } from '@/shared/ui/search-input'
import { Segmented } from '@/shared/ui/segmented'

import type { usePatientsTable } from '../model/usePatientsTable'

type Table = ReturnType<typeof usePatientsTable>

export function PatientsToolbar({ table }: { table: Table }) {
	const t = useTranslations('Patients')
	return (
		<>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<Segmented
					aria-label={t('segments')}
					options={table.tabs}
					value={table.tab}
					onChange={table.setTab}
				/>
				<div className='flex flex-wrap gap-2'>
					<SearchInput
						label={t('nameIdOrPhone')}
						size='sm'
						className='basis-60'
					/>
					<Button size='sm' className='h-9'>
						<Funnel size={15} aria-hidden='true' />
						{t('dentist')}
					</Button>
					<Button size='sm' className='h-9'>
						<Download size={15} aria-hidden='true' />
						{t('export')}
					</Button>
				</div>
			</div>

			{table.selectedCount > 0 && (
				<div
					role='status'
					className='flex animate-pop flex-wrap items-center gap-2 rounded-xl bg-brand-soft py-1.5 pr-1.5 pl-3.5 text-brand-strong'
				>
					<span className='grow font-semibold'>
						{t('selected')} {table.selectedCount}
					</span>
					<Button size='sm' variant='primary'>
						{t('sendSms')}
					</Button>
					<Button size='sm'>{t('assignDentist')}</Button>
					<Button
						size='sm'
						variant='ghost'
						className='text-brand-strong'
						onClick={table.clearSelection}
					>
						{t('reset')}
					</Button>
				</div>
			)}
		</>
	)
}
