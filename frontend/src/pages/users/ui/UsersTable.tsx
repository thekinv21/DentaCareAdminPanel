'use client'

import { useTranslations } from 'next-intl'

import { Card } from '@/shared/ui/card'
import { SearchInput } from '@/shared/ui/search-input'
import { Segmented } from '@/shared/ui/segmented'
import { Table, TableScroll, Th } from '@/shared/ui/table'

import type { TUsersTableModel } from '../model/useUsersTable'
import { UserRow } from './UserRow'

type TUsersTableProps = { table: TUsersTableModel }

export function UsersTable({ table }: TUsersTableProps) {
	const t = useTranslations('Users')
	return (
		<Card
			as='section'
			className='min-h-115 flex-auto animate-rise max-[720px]:flex-none'
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<Segmented
					aria-label={t('userType')}
					options={table.types}
					value={table.type}
					onChange={table.setType}
				/>
				<div className='flex items-center gap-2 max-[720px]:flex-wrap'>
					<SearchInput
						label={t('searchUser')}
						placeholder={t('nameEmailOrPhone')}
						size='sm'
						className='w-56'
						value={table.query}
						onChange={event => table.setQuery(event.target.value)}
					/>
					<Segmented
						aria-label={t('status')}
						options={table.statuses}
						value={table.status}
						onChange={table.setStatus}
						className='flex-nowrap'
					/>
				</div>
			</div>
			<TableScroll className='min-h-0 flex-auto'>
				<Table className='min-w-245'>
					<thead>
						<tr>
							<Th>{t('user')}</Th>
							<Th>{t('type')}</Th>
							<Th>{t('role')}</Th>
							<Th>{t('branch')}</Th>
							<Th>{t('phone')}</Th>
							<Th>{t('lastLogin')}</Th>
							<Th>{t('active')}</Th>
							<Th>
								<span className='sr-only'>{t('actions')}</span>
							</Th>
						</tr>
					</thead>
					<tbody>
						{table.rows.map(row => (
							<UserRow key={row.id} row={row} />
						))}
					</tbody>
				</Table>
				{table.rows.length === 0 && (
					<p className='py-12 text-center text-[12.5px] text-ink-muted'>
						{t('nobodyFound')}
					</p>
				)}
			</TableScroll>
			<div className='flex flex-wrap items-center justify-between gap-2.5 text-[12.5px] text-ink-muted'>
				<span>{table.countText}</span>
				<span>{t('deactivatedNote')}</span>
			</div>
		</Card>
	)
}
