import { Badge } from '@/shared/ui/badge'
import { RowActions } from '@/shared/ui/row-actions'
import { Td } from '@/shared/ui/table'

import type { TServiceRow } from '../model/useServices'

type TServiceRowProps = { row: TServiceRow }

export function ServiceRow({ row }: TServiceRowProps) {
	return (
		<tr>
			<Td mono nowrap className='text-ink-muted'>
				{row.code}
			</Td>
			<Td className='font-semibold'>{row.name}</Td>
			<Td>
				<Badge>{row.category}</Badge>
			</Td>
			<Td mono nowrap align='right'>
				{row.duration}
			</Td>
			<Td mono nowrap align='right' className='font-semibold'>
				{row.price}
			</Td>
			<Td>
				<Badge tone={row.foms.tone}>{row.foms.label}</Badge>
			</Td>
			<Td align='right' nowrap>
				<RowActions
					subject={row.name}
					onEdit={row.edit}
					onDelete={row.remove}
				/>
			</Td>
		</tr>
	)
}
