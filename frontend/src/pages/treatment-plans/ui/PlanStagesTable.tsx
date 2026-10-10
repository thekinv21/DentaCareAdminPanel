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

import type { TPlanFormInput } from '../model/PlanFormSchema'
import { usePlanStages } from '../model/usePlanStages'

const cellInput = cn(inputClass, 'h-9 px-2.5')
const numberInput = cn(cellInput, 'font-mono')

export function PlanStagesTable() {
	const t = useTranslations('PlanForm')
	const stages = usePlanStages()
	const inputProps = useFieldProps<TPlanFormInput>()

	return (
		<FormSection
			title={t('treatmentStages')}
			aside={
				<Button size='sm' onClick={stages.add}>
					<Plus size={15} aria-hidden='true' />
					{t('addStage')}
				</Button>
			}
		>
			<div className='overflow-auto scrollbar-thin'>
				<Table hoverRows={false} className='min-w-190'>
					<thead>
						<tr>
							<Th className='w-8.5'>№</Th>
							<Th>{t('service')}</Th>
							<Th className='w-22.5'>{t('tooth')}</Th>
							<Th className='w-17.5'>{t('qty')}</Th>
							<Th className='w-30'>{t('priceSom')}</Th>
							<Th className='w-22.5'>{t('discountPercent')}</Th>
							<Th align='right' className='w-30'>
								{t('sum')}
							</Th>
							<Th className='w-10' />
						</tr>
					</thead>
					<tbody>
						{stages.rows.map(({ key, index, sum, remove }) => (
							<tr key={key}>
								<Td mono className='text-ink-muted'>
									{index + 1}
								</Td>
								<Td>
									<input
										className={cellInput}
										aria-label={t('service')}
										{...inputProps(`stages.${index}.service`)}
									/>
								</Td>
								<Td>
									<input
										className={numberInput}
										aria-label={t('tooth')}
										{...inputProps(`stages.${index}.tooth`)}
									/>
								</Td>
								<Td>
									<input
										inputMode='numeric'
										className={numberInput}
										aria-label={t('quantity')}
										{...inputProps(`stages.${index}.qty`)}
									/>
								</Td>
								<Td>
									<input
										inputMode='numeric'
										className={numberInput}
										aria-label={t('price')}
										{...inputProps(`stages.${index}.price`)}
									/>
								</Td>
								<Td>
									<input
										inputMode='numeric'
										className={numberInput}
										aria-label={t('discountPercent')}
										{...inputProps(`stages.${index}.discount`)}
									/>
								</Td>
								<Td mono nowrap align='right' className='font-semibold'>
									{sum}
								</Td>
								<Td>
									<IconButton
										quiet
										size='sm'
										aria-label={`${t('deleteStage')} ${index + 1}`}
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
			<FieldError name='stages' />
		</FormSection>
	)
}
