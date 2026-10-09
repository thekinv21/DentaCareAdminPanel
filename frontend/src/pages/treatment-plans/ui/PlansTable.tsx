'use client'

import Link from 'next/link'

import { Ellipsis } from 'lucide-react'

import { useI18n } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Card } from '@/shared/ui/card'
import { IconButton } from '@/shared/ui/icon-button'
import { ProgressBar } from '@/shared/ui/progress'
import { SearchInput } from '@/shared/ui/search-input'
import { Segmented } from '@/shared/ui/segmented'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import { usePlansTable } from '../model/use-plans-table'

export function PlansTable() {
	const { t } = useI18n()
	const { filter, setFilter, filters, rows } = usePlansTable()

	return (
		<Card
			as='section'
			className='min-h-[420px] flex-auto animate-rise max-[720px]:flex-none'
			style={{ animationDelay: '150ms' }}
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<Segmented
					aria-label={t('Фильтр планов')}
					options={filters}
					value={filter}
					onChange={setFilter}
				/>
				<SearchInput
					label={t('Пациент или зуб')}
					size='sm'
					className='basis-60'
				/>
			</div>
			<TableScroll className='min-h-0 flex-auto'>
				<Table className='min-w-[860px]'>
					<thead>
						<tr>
							<Th>{t('Пациент')}</Th>
							<Th>{t('План')}</Th>
							<Th>{t('Зубы')}</Th>
							<Th className='w-40'>{t('Выполнено')}</Th>
							<Th align='right'>{t('Стоимость')}</Th>
							<Th>{t('Статус')}</Th>
							<Th>
								<span className='sr-only'>{t('Действия')}</span>
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
									<div className='text-[12.5px] leading-[18px] whitespace-nowrap text-ink-muted'>
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
											className='flex-grow'
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
								<Td align='right'>
									<IconButton
										quiet
										size='sm'
										aria-label={`${t('Действия:')} ${row.patientName}`}
									>
										<Ellipsis size={16} aria-hidden='true' />
									</IconButton>
								</Td>
							</tr>
						))}
					</tbody>
				</Table>
			</TableScroll>
		</Card>
	)
}
