'use client'

import { Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { useFieldProps } from '@/shared/lib/form'
import { inputClass } from '@/shared/ui/field'
import { IconButton } from '@/shared/ui/icon-button'
import { Td } from '@/shared/ui/table'

import type { TInvoiceFormInput } from '../model/InvoiceFormSchema'
import type { TInvoiceItemRow } from '../model/useInvoiceItems'

const cellInputClass = cn(inputClass, 'h-9 px-2.5')
const numberInputClass = cn(cellInputClass, 'font-mono')

type TInvoiceItemRowProps = { row: TInvoiceItemRow }

/**
 * One editable service line of the invoice
 */
export function InvoiceItemRow({ row }: TInvoiceItemRowProps) {
	const t = useTranslations('InvoiceForm')
	const inputProps = useFieldProps<TInvoiceFormInput>()

	return (
		<tr>
			<Td>
				<input
					className={cellInputClass}
					aria-label={t('service')}
					{...inputProps(`items.${row.index}.name`)}
				/>
			</Td>
			<Td>
				<input
					className={numberInputClass}
					aria-label={t('tooth')}
					{...inputProps(`items.${row.index}.tooth`)}
				/>
			</Td>
			<Td>
				<input
					inputMode='numeric'
					className={numberInputClass}
					aria-label={t('price')}
					{...inputProps(`items.${row.index}.price`)}
				/>
			</Td>
			<Td mono nowrap align='right' className='font-semibold'>
				{row.sum}
			</Td>
			<Td>
				<IconButton
					quiet
					size='sm'
					aria-label={t('removeItem')}
					onClick={row.remove}
					className='text-danger'
				>
					<Trash2 size={16} aria-hidden='true' />
				</IconButton>
			</Td>
		</tr>
	)
}
