'use client'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/shared/ui/button'
import { FieldError } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'
import { Table, Th } from '@/shared/ui/table'

import { useInvoiceItems } from '../model/useInvoiceItems'
import { InvoiceItemRow } from './InvoiceItemRow'

export function InvoiceItemsTable() {
	const t = useTranslations('InvoiceForm')
	const items = useInvoiceItems()

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
						{items.rows.map(row => (
							<InvoiceItemRow key={row.key} row={row} />
						))}
					</tbody>
				</Table>
			</div>
			<FieldError name='items' />
		</FormSection>
	)
}
