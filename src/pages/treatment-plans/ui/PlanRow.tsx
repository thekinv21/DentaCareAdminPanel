'use client'

import Link from 'next/link'

import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { ProgressBar } from '@/shared/ui/progress'
import { RowActions } from '@/shared/ui/row-actions'
import { Td } from '@/shared/ui/table'

import type { TPlanRow } from '../model/usePlansTable'

type TPlanRowProps = { row: TPlanRow }

export function PlanRow({ row }: TPlanRowProps) {
	return (
		<tr>
			<Td>
				<div className='flex items-center gap-2.5'>
					<Avatar initials={row.initials} tone={row.tone} />
					<div className='min-w-0'>
						<Link
							href={ROUTES.patient(row.patientId)}
							className='block font-semibold whitespace-nowrap text-ink no-underline hover:underline'
						>
							{row.patientName}
						</Link>
						<span className='font-mono text-[11.5px] whitespace-nowrap text-ink-muted'>
							{row.meta}
						</span>
					</div>
				</div>
			</Td>
			<Td>
				<span className='font-semibold'>{row.title}</span>
				<div className='text-[12.5px] leading-4.5 whitespace-nowrap text-ink-muted'>
					{row.updated}
				</div>
			</Td>
			<Td mono nowrap>
				{row.teeth}
			</Td>
			<Td>
				<div className='flex items-center gap-2.5'>
					<ProgressBar
						value={row.progress}
						delay={row.progressDelay}
						fillClass={row.progressClass}
						className='grow'
					/>
					<span className='font-mono text-xs whitespace-nowrap text-ink-muted'>
						{row.steps}
					</span>
				</div>
			</Td>
			<Td mono nowrap align='right' className='font-semibold'>
				{row.value}
			</Td>
			<Td>
				<Badge tone={row.status.tone}>{row.status.label}</Badge>
			</Td>
			<Td align='right' nowrap>
				<RowActions
					subject={row.patientName}
					onEdit={row.edit}
					onDelete={row.remove}
				/>
			</Td>
		</tr>
	)
}
