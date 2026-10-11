'use client'

import { useTranslations } from 'next-intl'

import { TriCheckbox } from '@/shared/ui/checkbox'
import { Td } from '@/shared/ui/table'

import type { TPermissionRow } from '../model/usePermissionMatrix'

type TPermissionRowProps = { row: TPermissionRow }

/**
 * One module of the permission matrix: its actions and the "all" toggle
 */
export function PermissionRow({ row }: TPermissionRowProps) {
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
				<TriCheckbox
					checked={row.state}
					onChange={row.onToggleRow}
					aria-label={`${t('allPermissionsColon')} ${row.name}`}
				/>
			</Td>
		</tr>
	)
}
