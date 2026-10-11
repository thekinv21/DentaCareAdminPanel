'use client'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/shared/ui/button'
import { FieldError } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'
import { Table, Th } from '@/shared/ui/table'

import { usePlanStages } from '../model/usePlanStages'
import { PlanStageRow } from './PlanStageRow'

export function PlanStagesTable() {
	const t = useTranslations('PlanForm')
	const stages = usePlanStages()

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
						{stages.rows.map(row => (
							<PlanStageRow key={row.key} row={row} />
						))}
					</tbody>
				</Table>
			</div>
			<FieldError name='stages' />
		</FormSection>
	)
}
