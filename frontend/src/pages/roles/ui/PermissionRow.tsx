'use client'

import { useTranslations } from 'next-intl'

import { TriCheckbox } from '@/shared/ui/checkbox'
import { Segmented } from '@/shared/ui/segmented'
import { Td } from '@/shared/ui/table'

import type {
	TPermissionMatrixModel,
	TPermissionRow,
} from '../model/usePermissionMatrix'

type TPermissionRowProps = {
	row: TPermissionRow
	scopes: TPermissionMatrixModel['scopes']
}

/**
 * One module of the permission matrix: its actions, data scope and "all" toggle
 */
export function PermissionRow({ row, scopes }: TPermissionRowProps) {
	const t = useTranslations('RoleForm')

	return (
		<tr>
			<Td>
				<div className='font-bold'>{row.name}</div>
				<div className='text-xs text-ink-muted'>{row.hint}</div>
			</Td>
			{row.cells.map(cell => (
				<Td key={cell.id} align='center'>
					{cell.isAvailable ? (
						<TriCheckbox
							checked={cell.isChecked}
							onChange={cell.onToggle}
							aria-label={cell.label}
						/>
					) : (
						<span className='text-ink-muted'>—</span>
					)}
				</Td>
			))}
			<Td align='center'>
				{row.isScoped ? (
					<Segmented
						aria-label={`${t('data')}: ${row.name}`}
						size='sm'
						options={scopes}
						value={row.scope}
						onChange={row.onScopeChange}
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
					onChange={row.onToggleRow}
					aria-label={`${t('allPermissionsColon')} ${row.name}`}
				/>
			</Td>
		</tr>
	)
}
