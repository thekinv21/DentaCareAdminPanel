'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/shared/ui/button'
import { TriCheckbox } from '@/shared/ui/checkbox'
import { FormSection } from '@/shared/ui/form-section'
import { Segmented } from '@/shared/ui/segmented'
import { Table, Td, Th } from '@/shared/ui/table'

import type { TPermissionMatrixModel } from '../model/usePermissionMatrix'

type TPermissionMatrixProps = { matrix: TPermissionMatrixModel }

export function PermissionMatrix({ matrix }: TPermissionMatrixProps) {
	const t = useTranslations('RoleForm')
	const scopes = [
		{ id: 'all' as const, label: t('scopeAll') },
		{ id: 'own' as const, label: t('scopeOwn') },
	]

	return (
		<FormSection
			title={t('permissions')}
			aside={
				<>
					<span className='text-[12.5px] text-ink-muted'>
						{t('permissionsOf', { n: matrix.granted, total: matrix.total })}
					</span>
					<Button size='sm' onClick={matrix.viewOnly}>
						{t('viewOnly')}
					</Button>
					<Button size='sm' onClick={matrix.allOn}>
						{t('everything')}
					</Button>
					<Button size='sm' variant='dangerGhost' onClick={matrix.allOff}>
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
							{matrix.columns.map(column => (
								<Th key={column.id} align='center'>
									<span className='inline-flex flex-col items-center gap-1.5'>
										{column.label}
										<TriCheckbox
											checked={column.state}
											onChange={column.toggle}
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
						{matrix.rows.map(row => (
							<tr key={row.id}>
								<Td>
									<div className='font-bold'>{row.name}</div>
									<div className='text-xs text-ink-muted'>{row.hint}</div>
								</Td>
								{row.cells.map(cell => (
									<Td key={cell.id} align='center'>
										{cell.available ? (
											<TriCheckbox
												checked={cell.on}
												onChange={cell.toggle}
												aria-label={cell.label}
											/>
										) : (
											<span className='text-ink-muted'>—</span>
										)}
									</Td>
								))}
								<Td align='center'>
									{row.scoped ? (
										<Segmented
											aria-label={`${t('data')}: ${row.name}`}
											size='sm'
											options={scopes}
											value={row.scope}
											onChange={row.setScope}
											className='mx-auto w-max'
										/>
									) : (
										<span className='text-[12.5px] text-ink-muted'>
											{t('wholeClinic')}
										</span>
									)}
								</Td>
								<Td align='center'>
									<TriCheckbox
										checked={row.state}
										onChange={row.toggleRow}
										aria-label={`${t('allPermissionsColon')} ${row.name}`}
									/>
								</Td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</FormSection>
	)
}
