'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardHeader } from '@/shared/ui/card'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import { useTreatmentPlan } from '../model/useTreatmentPlan'

export function TreatmentPlanSection() {
	const t = useTranslations('PatientProfile')
	const plan = useTreatmentPlan()

	return (
		<Card as='section' className='animate-fade'>
			<CardHeader
				title={t('treatmentPlan')}
				description={t('agreedWithPatient12')}
				actions={<Button size='sm'>{t('bookRemaining')}</Button>}
			/>
			<TableScroll>
				<Table className='min-w-160'>
					<thead>
						<tr>
							<Th>№</Th>
							<Th>{t('procedure')}</Th>
							<Th>{t('tooth')}</Th>
							<Th>{t('date')}</Th>
							<Th>{t('status')}</Th>
							<Th align='right'>{t('cost')}</Th>
						</tr>
					</thead>
					<tbody>
						{plan.steps.map(step => (
							<tr key={step.number}>
								<Td mono className='text-ink-muted'>
									{step.number}
								</Td>
								<Td className='font-semibold'>{step.procedure}</Td>
								<Td mono>{step.tooth}</Td>
								<Td nowrap className={cn(step.dateMuted && 'text-ink-muted')}>
									{step.date}
								</Td>
								<Td>
									<Badge tone={step.status.tone}>{step.status.label}</Badge>
								</Td>
								<Td mono nowrap align='right'>
									{step.price}
								</Td>
							</tr>
						))}
					</tbody>
				</Table>
			</TableScroll>
			<dl className='flex flex-wrap justify-end gap-2'>
				{plan.totals.map(item => (
					<div
						key={item.label}
						className={cn('min-w-35 rounded-xl px-3.5 py-2', item.box)}
					>
						<dt className={cn('text-[12.5px]', item.text)}>{item.label}</dt>
						<dd className='font-mono font-semibold'>{item.value}</dd>
					</div>
				))}
			</dl>
		</Card>
	)
}
