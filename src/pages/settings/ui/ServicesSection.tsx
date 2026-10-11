'use client'

import { useTranslations } from 'next-intl'

import { SegmentedField } from '@/shared/ui/segmented'
import { Table, Th } from '@/shared/ui/table'

import type { TServicesModel } from '../model/useServices'
import { ServiceRow } from './ServiceRow'

type TServicesSectionProps = { services: TServicesModel }

export function ServicesSection({ services }: TServicesSectionProps) {
	const t = useTranslations('Settings')
	const { filters, categories, rows } = services

	return (
		<div className='flex animate-fade flex-col gap-3 pb-2'>
			<SegmentedField
				control={filters.control}
				name='category'
				aria-label={t('category')}
				options={categories}
				className='self-start'
			/>
			<Table className='min-w-190'>
				<thead>
					<tr>
						<Th>{t('code')}</Th>
						<Th>{t('serviceColumn')}</Th>
						<Th>{t('category')}</Th>
						<Th align='right'>{t('time')}</Th>
						<Th align='right'>{t('price')}</Th>
						<Th>{t('mhif')}</Th>
						<Th>
							<span className='sr-only'>{t('actions')}</span>
						</Th>
					</tr>
				</thead>
				<tbody>
					{rows.map(row => (
						<ServiceRow key={row.code} row={row} />
					))}
				</tbody>
			</Table>
		</div>
	)
}
