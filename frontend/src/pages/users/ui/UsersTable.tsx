'use client'

import { useTranslations } from 'next-intl'

import { Card } from '@/shared/ui/card'
import { SearchInput } from '@/shared/ui/search-input'
import { SegmentedField } from '@/shared/ui/segmented'
import { Table, TableScroll, Th } from '@/shared/ui/table'

import type { TUsersTableModel } from '../model/useUsersTable'
import { UserRow } from './UserRow'

type TUsersTableProps = {
	form: TUsersTableModel['form']
	types: TUsersTableModel['types']
	statuses: TUsersTableModel['statuses']
	rows: TUsersTableModel['rows']
	countText: string
}

export function UsersTable(props: TUsersTableProps) {
	const { form, types, statuses, rows, countText } = props

	const t = useTranslations('Users')

	const { control, register } = form

	return (
		<Card
			as='section'
			className='min-h-115 flex-auto animate-rise max-mobile:flex-none'
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<SegmentedField
					control={control}
					name='type'
					aria-label={t('userType')}
					options={types}
				/>
				<div className='flex items-center gap-2 max-mobile:flex-wrap'>
					<SearchInput
						label={t('searchUser')}
						placeholder={t('nameEmailOrPhone')}
						size='sm'
						className='w-56'
						{...register('search')}
					/>
					<SegmentedField
						control={control}
						name='status'
						aria-label={t('status')}
						options={statuses}
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
						{rows.map(row => (
							<UserRow key={row.id} row={row} />
						))}
					</tbody>
				</Table>
				{rows.length === 0 && (
					<p className='py-12 text-center text-[12.5px] text-ink-muted'>
						{t('nobodyFound')}
					</p>
				)}
			</TableScroll>
			<div className='flex flex-wrap items-center justify-between gap-2.5 text-[12.5px] text-ink-muted'>
				<span>{countText}</span>
				<span>{t('deactivatedNote')}</span>
			</div>
		</Card>
	)
}
