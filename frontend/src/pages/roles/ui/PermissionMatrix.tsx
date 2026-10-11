'use client'

import { useTranslations } from 'next-intl'

import { FormSection } from '@/shared/ui/form-section'
import { Table, Th } from '@/shared/ui/table'

import { usePermissionMatrix } from '../model/usePermissionMatrix'
import { PermissionRow } from './PermissionRow'

export function PermissionMatrix() {
	const t = useTranslations('RoleForm')

	const { columns, rows, granted, total } = usePermissionMatrix()

	return (
		<FormSection
			title={t('permissions')}
			aside={
				<span className='text-[12.5px] text-ink-muted'>
					{t('permissionsOf', { n: granted, total })}
				</span>
			}
		>
			<div className='overflow-auto scrollbar-thin'>
				<Table className='min-w-140'>
					<thead>
						<tr>
							<Th>{t('section')}</Th>
							{columns.map(column => (
								<Th key={column.id} align='center'>
									{column.label}
								</Th>
							))}
							<Th align='center'>{t('all')}</Th>
						</tr>
					</thead>
					<tbody>
						{rows.map(row => (
							<PermissionRow key={row.id} row={row} />
						))}
					</tbody>
				</Table>
			</div>
		</FormSection>
	)
}
