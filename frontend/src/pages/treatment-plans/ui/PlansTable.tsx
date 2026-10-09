'use client'

import Link from 'next/link'

import { Pencil, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Card } from '@/shared/ui/card'
import { IconButton } from '@/shared/ui/icon-button'
import { ProgressBar } from '@/shared/ui/progress'
import { SearchInput } from '@/shared/ui/search-input'
import { Segmented } from '@/shared/ui/segmented'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import type { TPlansTableModel } from '../model/usePlansTable'

type TPlansTableProps = { table: TPlansTableModel }

export function PlansTable({ table }: TPlansTableProps) {
	const t = useTranslations('TreatmentPlans')
	const { filter, setFilter, filters, rows } = table

	return (
		<Card
			as='section'
			className='min-h-105 flex-auto animate-rise max-[720px]:flex-none'
			style={{ animationDelay: '150ms' }}
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<Segmented
					aria-label={t('filterPlans')}
					options={filters}
					value={filter}
					onChange={setFilter}
				/>
				<SearchInput
					label={t('patientOrTooth')}
					size='sm'
					className='basis-60'
				/>
			</div>
			<TableScroll className='min-h-0 flex-auto'>
				<Table className='min-w-215'>
					<thead>
						<tr>
							<Th>{t('patient')}</Th>
							<Th>{t('plan')}</Th>
							<Th>{t('teeth')}</Th>
							<Th className='w-40'>{t('done')}</Th>
							<Th align='right'>{t('cost')}</Th>
							<Th>{t('status')}</Th>
							<Th>
								<span className='sr-only'>{t('actions')}</span>
							</Th>
						</tr>
					</thead>
					<tbody>
						{rows.map(row => (
							<tr key={row.key}>
								<Td>
									<div className='flex items-center gap-2.5'>
										<Avatar initials={row.initials} tone={row.tone} />
										<div className='min-w-0'>
											<Link
												href={ROUTES.patient(row.patientId)}
												className='block font-semibold whitespace-nowrap text-ink no-underline hover:underline'
											>
												{row.patientName}
											</Link>
											<span className='font-mono text-[11.5px] whitespace-nowrap text-ink-muted'>
												{row.meta}
											</span>
										</div>
									</div>
								</Td>
								<Td>
									<span className='font-semibold'>{row.title}</span>
									<div className='text-[12.5px] leading-4.5 whitespace-nowrap text-ink-muted'>
										{row.updated}
									</div>
								</Td>
								<Td mono nowrap>
									{row.teeth}
								</Td>
								<Td>
									<div className='flex items-center gap-2.5'>
										<ProgressBar
											value={row.progress}
											delay={row.progressDelay}
											fillClass={row.progressClass}
											className='grow'
										/>
										<span className='font-mono text-xs whitespace-nowrap text-ink-muted'>
											{row.steps}
										</span>
									</div>
								</Td>
								<Td mono nowrap align='right' className='font-semibold'>
									{row.value}
								</Td>
								<Td>
									<Badge tone={row.status.tone}>{row.status.label}</Badge>
								</Td>
								<Td align='right' nowrap>
									<span className='inline-flex gap-0.5'>
										<IconButton
											quiet
											size='sm'
											aria-label={`${t('editColon')} ${row.patientName}`}
											title={t('edit')}
											onClick={row.edit}
										>
											<Pencil size={16} aria-hidden='true' />
										</IconButton>
										<IconButton
											quiet
											size='sm'
											aria-label={`${t('deleteColon')} ${row.patientName}`}
											title={t('delete')}
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
			</TableScroll>
		</Card>
	)
}
