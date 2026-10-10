'use client'

import { Plus, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { useFieldProps } from '@/shared/lib/form'
import { Button } from '@/shared/ui/button'
import { FieldError, inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'
import { IconButton } from '@/shared/ui/icon-button'
import { Table, Td, Th } from '@/shared/ui/table'

import type { TInvoiceFormInput } from '../model/InvoiceFormSchema'
import { useInvoiceItems } from '../model/useInvoiceItems'

const cellInput = cn(inputClass, 'h-9 px-2.5')
const numberInput = cn(cellInput, 'font-mono')

export function InvoiceItemsTable() {
	const t = useTranslations('InvoiceForm')
	const items = useInvoiceItems()
	const inputProps = useFieldProps<TInvoiceFormInput>()

	return (
		<FormSection
			title={t('items')}
			aside={
				<Button size='sm' onClick={items.add}>
					<Plus size={15} aria-hidden='true' />
					{t('addService')}
				</Button>
			}
		>
			<div className='overflow-auto scrollbar-thin'>
				<Table hoverRows={false} className='min-w-140'>
					<thead>
						<tr>
							<Th>{t('service')}</Th>
							<Th className='w-20'>{t('tooth')}</Th>
							<Th className='w-32.5'>{t('price')}</Th>
							<Th align='right' className='w-30'>
								{t('amount')}
							</Th>
							<Th className='w-10' />
						</tr>
					</thead>
					<tbody>
						{items.rows.map(({ key, index, sum, remove }) => (
							<tr key={key}>
								<Td>
									<input
										className={cellInput}
										aria-label={t('service')}
										{...inputProps(`items.${index}.name`)}
									/>
								</Td>
								<Td>
									<input
										className={numberInput}
										aria-label={t('tooth')}
										{...inputProps(`items.${index}.tooth`)}
									/>
								</Td>
								<Td>
									<input
										inputMode='numeric'
										className={numberInput}
										aria-label={t('price')}
										{...inputProps(`items.${index}.price`)}
									/>
								</Td>
								<Td mono nowrap align='right' className='font-semibold'>
									{sum}
								</Td>
								<Td>
									<IconButton
										quiet
										size='sm'
										aria-label={t('removeItem')}
										onClick={remove}
										className='text-danger'
									>
										<Trash2 size={16} aria-hidden='true' />
									</IconButton>
								</Td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
			<FieldError name='items' />
		</FormSection>
	)
}
