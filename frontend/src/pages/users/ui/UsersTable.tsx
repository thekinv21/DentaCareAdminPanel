'use client'

import { useTranslations } from 'next-intl'

import { Card } from '@/shared/ui/card'
import { DataGrid, DataGridPagination } from '@/shared/ui/data-grid'
import { SearchInput } from '@/shared/ui/search-input'
import { SegmentedField } from '@/shared/ui/segmented'

import type { TUserRow } from '../model/UserRow'
import type { TUsersTableModel } from '../model/useUsersTable'

type TUsersTableProps = {
	form: TUsersTableModel['form']
	types: TUsersTableModel['types']
	statuses: TUsersTableModel['statuses']
	table: TUsersTableModel['table']
}

const isRowMuted = (row: TUserRow) => !row.isActive

export function UsersTable(props: TUsersTableProps) {
	const { form, types, statuses, table } = props

	const t = useTranslations('Users')

	const { control, register } = form

	return (
		<Card as='section' className='animate-rise'>
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
			<DataGrid
				table={table}
				emptyText={t('nobodyFound')}
				className='min-w-245'
				isRowMuted={isRowMuted}
			/>
			<div className='flex flex-wrap items-center justify-between gap-2.5 text-[12.5px] text-ink-muted'>
				<span>{t('deactivatedNote')}</span>
				<DataGridPagination table={table} />
			</div>
		</Card>
	)
}
