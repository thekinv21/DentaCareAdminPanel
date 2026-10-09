'use client'

import { Plus, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { Button } from '@/shared/ui/button'
import { inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'
import { IconButton } from '@/shared/ui/icon-button'
import { Table, Td, Th } from '@/shared/ui/table'

import type { TInvoiceFormModel } from '../model/useInvoiceForm'

const cellInput = cn(inputClass, 'h-9 px-2.5')

type TInvoiceItemsTableProps = { form: TInvoiceFormModel }

export function InvoiceItemsTable({ form }: TInvoiceItemsTableProps) {
	const t = useTranslations('InvoiceForm')
	const error = form.errorOf(form.errors.items)

	return (
		<FormSection
			title={t('items')}
			aside={
				<Button size='sm' onClick={form.addItem}>
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
						{form.items.map(item => (
							<tr key={item.key}>
								<Td>
									<input
										className={cellInput}
										aria-label={t('service')}
										aria-invalid={item.invalid('name')}
										{...form.register(`items.${item.index}.name`)}
									/>
								</Td>
								<Td>
									<input
										className={cn(cellInput, 'font-mono')}
										aria-label={t('tooth')}
										{...form.register(`items.${item.index}.tooth`)}
									/>
								</Td>
								<Td>
									<input
										inputMode='numeric'
										className={cn(cellInput, 'font-mono')}
										aria-label={t('price')}
										aria-invalid={item.invalid('price')}
										{...form.register(`items.${item.index}.price`)}
									/>
								</Td>
								<Td mono nowrap align='right' className='font-semibold'>
									{item.sum}
								</Td>
								<Td>
									<IconButton
										quiet
										size='sm'
										aria-label={t('removeItem')}
										onClick={item.remove}
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
			{error && (
				<span className='text-xs font-semibold text-danger'>{error}</span>
			)}
		</FormSection>
	)
}
