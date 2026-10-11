'use client'

import { Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { useFieldProps } from '@/shared/lib/form'
import { inputClass } from '@/shared/ui/field'
import { IconButton } from '@/shared/ui/icon-button'
import { Td } from '@/shared/ui/table'

import type { TPlanFormInput } from '../model/PlanFormSchema'
import type { TPlanStageRow } from '../model/usePlanStages'

const cellInputClass = cn(inputClass, 'h-9 px-2.5')
const numberInputClass = cn(cellInputClass, 'font-mono')

type TStageField = 'tooth' | 'qty' | 'price' | 'discount'

type TPlanStageRowProps = { row: TPlanStageRow }

/**
 * One editable stage of the treatment plan
 */
export function PlanStageRow({ row }: TPlanStageRowProps) {
	const t = useTranslations('PlanForm')
	const inputProps = useFieldProps<TPlanFormInput>()

	return (
		<tr>
			<Td mono className='text-ink-muted'>
				{row.index + 1}
			</Td>
			<Td>
				<input
					className={cellInputClass}
					aria-label={t('service')}
					{...inputProps(`stages.${row.index}.service`)}
				/>
			</Td>
			<NumberCell index={row.index} field='tooth' label={t('tooth')} />
			<NumberCell index={row.index} field='qty' label={t('quantity')} />
			<NumberCell index={row.index} field='price' label={t('price')} />
			<NumberCell
				index={row.index}
				field='discount'
				label={t('discountPercent')}
			/>
			<Td mono nowrap align='right' className='font-semibold'>
				{row.sum}
			</Td>
			<Td>
				<IconButton
					quiet
					size='sm'
					aria-label={`${t('deleteStage')} ${row.index + 1}`}
					onClick={row.remove}
					className='text-danger'
				>
					<Trash2 size={16} aria-hidden='true' />
				</IconButton>
			</Td>
		</tr>
	)
}

type TNumberCellProps = { index: number; field: TStageField; label: string }

function NumberCell({ index, field, label }: TNumberCellProps) {
	const inputProps = useFieldProps<TPlanFormInput>()

	return (
		<Td>
			<input
				inputMode={field === 'tooth' ? undefined : 'numeric'}
				className={numberInputClass}
				aria-label={label}
				{...inputProps(`stages.${index}.${field}`)}
			/>
		</Td>
	)
}
