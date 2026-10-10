'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/shared/ui/button'
import { TriCheckbox } from '@/shared/ui/checkbox'
import { FormSection } from '@/shared/ui/form-section'
import { Table, Th } from '@/shared/ui/table'

import { usePermissionMatrix } from '../model/usePermissionMatrix'
import { PermissionRow } from './PermissionRow'

export function PermissionMatrix() {
	const t = useTranslations('RoleForm')

	const {
		rows,
		columns,
		scopes,
		granted,
		total,
		onAllOn,
		onAllOff,
		onViewOnly,
	} = usePermissionMatrix()

	return (
		<FormSection
			title={t('permissions')}
			aside={
				<>
					<span className='text-[12.5px] text-ink-muted'>
						{t('permissionsOf', { n: granted, total })}
					</span>
					<Button size='sm' onClick={onViewOnly}>
						{t('viewOnly')}
					</Button>
					<Button size='sm' onClick={onAllOn}>
						{t('everything')}
					</Button>
					<Button size='sm' variant='dangerGhost' onClick={onAllOff}>
						{t('clear')}
					</Button>
				</>
			}
		>
			<div className='overflow-auto scrollbar-thin'>
				<Table className='min-w-180'>
					<thead>
						<tr>
							<Th>{t('section')}</Th>
							{columns.map(column => (
								<Th key={column.id} align='center'>
									<span className='inline-flex flex-col items-center gap-1.5'>
										{column.label}
										<TriCheckbox
											checked={column.state}
											onChange={column.onToggle}
											aria-label={t('forAllSections', { action: column.label })}
										/>
									</span>
								</Th>
							))}
							<Th align='center'>{t('data')}</Th>
							<Th align='center'>{t('all')}</Th>
						</tr>
					</thead>
					<tbody>
						{rows.map(row => (
							<PermissionRow key={row.id} row={row} scopes={scopes} />
						))}
					</tbody>
				</Table>
			</div>
		</FormSection>
	)
}
