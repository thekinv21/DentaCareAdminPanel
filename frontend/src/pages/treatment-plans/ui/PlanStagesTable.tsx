'use client'

import { Plus, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { Button } from '@/shared/ui/button'
import { inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'
import { IconButton } from '@/shared/ui/icon-button'
import { Table, Td, Th } from '@/shared/ui/table'

import type { TPlanFormModel } from '../model/usePlanForm'

const cellInput = cn(inputClass, 'h-9 px-2.5')

type TPlanStagesTableProps = { form: TPlanFormModel }

export function PlanStagesTable({ form }: TPlanStagesTableProps) {
	const t = useTranslations('PlanForm')
	const error = form.errorOf(form.stagesError)

	return (
		<FormSection
			title={t('treatmentStages')}
			aside={
				<Button size='sm' onClick={form.addStage}>
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
						{form.stages.map(stage => (
							<tr key={stage.key}>
								<Td mono className='text-ink-muted'>
									{stage.index + 1}
								</Td>
								<Td>
									<input
										className={cellInput}
										aria-label={t('service')}
										aria-invalid={form.cellInvalid(stage.index, 'service')}
										{...form.register(`stages.${stage.index}.service`)}
									/>
								</Td>
								<Td>
									<input
										className={cn(cellInput, 'font-mono')}
										aria-label={t('tooth')}
										{...form.register(`stages.${stage.index}.tooth`)}
									/>
								</Td>
								<Td>
									<input
										inputMode='numeric'
										className={cn(cellInput, 'font-mono')}
										aria-label={t('quantity')}
										aria-invalid={form.cellInvalid(stage.index, 'qty')}
										{...form.register(`stages.${stage.index}.qty`)}
									/>
								</Td>
								<Td>
									<input
										inputMode='numeric'
										className={cn(cellInput, 'font-mono')}
										aria-label={t('price')}
										aria-invalid={form.cellInvalid(stage.index, 'price')}
										{...form.register(`stages.${stage.index}.price`)}
									/>
								</Td>
								<Td>
									<input
										inputMode='numeric'
										className={cn(cellInput, 'font-mono')}
										aria-label={t('discountPercent')}
										aria-invalid={form.cellInvalid(stage.index, 'discount')}
										{...form.register(`stages.${stage.index}.discount`)}
									/>
								</Td>
								<Td mono nowrap align='right' className='font-semibold'>
									{stage.sum}
								</Td>
								<Td>
									<IconButton
										quiet
										size='sm'
										aria-label={`${t('deleteStage')} ${stage.index + 1}`}
										onClick={stage.remove}
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
