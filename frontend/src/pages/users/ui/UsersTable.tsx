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
	table: TUsersTableModel['table']
}

const isRowMuted = (row: TUserRow) => !row.isActive

export function UsersTable({ form, types, table }: TUsersTableProps) {
	const t = useTranslations('Users')

	const { control, register } = form

	return (
		<Card as='section' className='min-h-0 animate-rise'>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<SegmentedField
					control={control}
					name='type'
					aria-label={t('userType')}
					options={types}
				/>
				<SearchInput
					label={t('searchUser')}
					placeholder={t('nameEmailOrPhone')}
					size='sm'
					className='w-56'
					{...register('search')}
				/>
			</div>
			<DataGrid
				table={table}
				emptyText={t('nobodyFound')}
				className='min-w-200'
				isRowMuted={isRowMuted}
			/>
			<div className='flex justify-end'>
				<DataGridPagination table={table} />
			</div>
		</Card>
	)
}
