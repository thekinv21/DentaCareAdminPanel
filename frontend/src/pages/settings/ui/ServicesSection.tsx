'use client'

import { Pencil, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Badge } from '@/shared/ui/badge'
import { IconButton } from '@/shared/ui/icon-button'
import { Segmented } from '@/shared/ui/segmented'
import { Table, Td, Th } from '@/shared/ui/table'

import type { TServicesModel } from '../model/useServices'

type TServicesSectionProps = { services: TServicesModel }

export function ServicesSection({ services }: TServicesSectionProps) {
	const t = useTranslations('Settings')
	const { category, setCategory, filters, rows } = services

	return (
		<div className='flex animate-fade flex-col gap-3 pb-2'>
			<Segmented
				aria-label={t('category')}
				options={filters}
				value={category}
				onChange={setCategory}
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
						<tr key={row.code}>
							<Td mono nowrap className='text-ink-muted'>
								{row.code}
							</Td>
							<Td className='font-semibold'>{row.name}</Td>
							<Td>
								<Badge>{row.category}</Badge>
							</Td>
							<Td mono nowrap align='right'>
								{row.duration}
							</Td>
							<Td mono nowrap align='right' className='font-semibold'>
								{row.price}
							</Td>
							<Td>
								<Badge tone={row.foms.tone}>{row.foms.label}</Badge>
							</Td>
							<Td align='right' nowrap>
								<span className='inline-flex gap-0.5'>
									<IconButton
										quiet
										size='sm'
										aria-label={`${t('change')} ${row.name}`}
										onClick={row.edit}
									>
										<Pencil size={16} aria-hidden='true' />
									</IconButton>
									<IconButton
										quiet
										size='sm'
										aria-label={`${t('deleteColon')} ${row.name}`}
										onClick={row.remove}
										className='text-danger'
									>
										<Trash2 size={16} aria-hidden='true' />
									</IconButton>
								</span>
							</Td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}
