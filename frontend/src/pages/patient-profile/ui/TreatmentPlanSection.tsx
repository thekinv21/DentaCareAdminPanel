'use client'

import { cn } from '@/shared/lib/cn'
import { useI18n } from '@/shared/lib/i18n'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardHeader } from '@/shared/ui/card'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import { useTreatmentPlan } from '../model/use-treatment-plan'

export function TreatmentPlanSection() {
	const { t } = useI18n()
	const plan = useTreatmentPlan()

	return (
		<Card as='section' className='animate-fade'>
			<CardHeader
				title={t('План лечения')}
				description={t('Согласован с пациентом 12.09.2026 · Касымова А.')}
				actions={<Button size='sm'>{t('Записать оставшиеся')}</Button>}
			/>
			<TableScroll>
				<Table className='min-w-[640px]'>
					<thead>
						<tr>
							<Th>№</Th>
							<Th>{t('Процедура')}</Th>
							<Th>{t('Зуб')}</Th>
							<Th>{t('Дата')}</Th>
							<Th>{t('Статус')}</Th>
							<Th align='right'>{t('Стоимость')}</Th>
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
						className={cn('min-w-[140px] rounded-xl px-3.5 py-2', item.box)}
					>
						<dt className={cn('text-[12.5px]', item.text)}>{item.label}</dt>
						<dd className='font-mono font-semibold'>{item.value}</dd>
					</div>
				))}
			</dl>
		</Card>
	)
}
