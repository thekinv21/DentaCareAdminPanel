'use client'

import { ArrowLeftRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { ProgressBar } from '@/shared/ui/progress'
import { RowActions } from '@/shared/ui/row-actions'
import { Td } from '@/shared/ui/table'

import type { TStockRow } from '../model/useStockTable'

type TStockRowProps = { row: TStockRow }

export function StockRow({ row }: TStockRowProps) {
	const t = useTranslations('Inventory')

	return (
		<tr>
			<Td>
				<span className='font-semibold'>{row.name}</span>
				<div className='font-mono text-[11.5px] text-ink-muted'>{row.sku}</div>
			</Td>
			<Td nowrap className='text-ink-muted'>
				{row.category}
			</Td>
			<Td>
				<div className='flex items-center gap-2.5'>
					<span className='min-w-18 font-mono font-semibold whitespace-nowrap'>
						{row.quantity}
					</span>
					<ProgressBar
						value={row.fillPercent}
						fillClass={row.fillClass}
						delay={row.animationDelay}
						className='grow'
					/>
				</div>
				<div className='text-[11.5px] text-ink-muted'>{row.minimum}</div>
			</Td>
			<Td nowrap className='text-ink-muted'>
				{row.supplier}
			</Td>
			<Td
				nowrap
				className={
					row.isExpiringSoon ? 'font-semibold text-danger' : 'text-ink-muted'
				}
			>
				{row.expires}
			</Td>
			<Td>
				<Badge tone={row.level.tone}>{row.level.label}</Badge>
			</Td>
			<Td align='right' nowrap>
				<RowActions subject={row.name} onEdit={row.edit} onDelete={row.remove}>
					<Button size='sm' onClick={row.move}>
						<ArrowLeftRight size={14} aria-hidden='true' />
						{t('movement')}
					</Button>
				</RowActions>
			</Td>
		</tr>
	)
}
