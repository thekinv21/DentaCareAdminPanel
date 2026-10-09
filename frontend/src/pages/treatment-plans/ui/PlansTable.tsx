'use client'

import { useState } from 'react'

import Link from 'next/link'

import { Ellipsis } from 'lucide-react'

import { formatSom, getInitials } from '@/shared/lib/format'
import { ROUTES } from '@/shared/routes'
import { Avatar, avatarTone } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Card } from '@/shared/ui/card'
import { IconButton } from '@/shared/ui/icon-button'
import { ProgressBar } from '@/shared/ui/progress'
import { SearchInput } from '@/shared/ui/search-input'
import { Segmented } from '@/shared/ui/segmented'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import {
	matchesPlanFilter,
	PLAN_STATUS,
	type PlanFilter,
	TREATMENT_PLANS,
} from '../model/plans'

const FILTERS: { id: PlanFilter; label: string }[] = [
	{ id: 'all', label: 'Все' },
	{ id: 'waiting', label: 'Ждут' },
	{ id: 'progress', label: 'В работе' },
	{ id: 'closed', label: 'Закрытые' },
]

export function PlansTable() {
	const [filter, setFilter] = useState<PlanFilter>('all')
	const rows = TREATMENT_PLANS.filter(plan => matchesPlanFilter(plan, filter))
	const options = FILTERS.map(option => ({
		...option,
		count: TREATMENT_PLANS.filter(plan => matchesPlanFilter(plan, option.id))
			.length,
	}))

	return (
		<Card
			as='section'
			className='min-h-[420px] flex-auto animate-rise max-[720px]:flex-none'
			style={{ animationDelay: '150ms' }}
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<Segmented
					aria-label='Фильтр планов'
					options={options}
					value={filter}
					onChange={setFilter}
				/>
				<SearchInput label='Пациент или зуб' size='sm' className='basis-60' />
			</div>
			<TableScroll className='min-h-0 flex-auto'>
				<Table className='min-w-[860px]'>
					<thead>
						<tr>
							<Th>Пациент</Th>
							<Th>План</Th>
							<Th>Зубы</Th>
							<Th className='w-40'>Выполнено</Th>
							<Th align='right'>Стоимость</Th>
							<Th>Статус</Th>
							<Th>
								<span className='sr-only'>Действия</span>
							</Th>
						</tr>
					</thead>
					<tbody>
						{rows.map(plan => {
							const index = TREATMENT_PLANS.indexOf(plan)
							const percent = plan.stepsTotal
								? Math.max(
										4,
										Math.round((plan.stepsDone / plan.stepsTotal) * 100),
									)
								: 0
							const status = PLAN_STATUS[plan.status]
							return (
								<tr key={plan.patientId}>
									<Td>
										<div className='flex items-center gap-2.5'>
											<Avatar
												initials={getInitials(plan.patientName)}
												tone={avatarTone(index)}
											/>
											<div className='min-w-0'>
												<Link
													href={ROUTES.patient(plan.patientId)}
													className='block font-semibold whitespace-nowrap text-ink no-underline hover:underline'
												>
													{plan.patientName}
												</Link>
												<span className='font-mono text-[11.5px] whitespace-nowrap text-ink-muted'>
													{plan.patientId} · {plan.doctor}
												</span>
											</div>
										</div>
									</Td>
									<Td>
										<span className='font-semibold'>{plan.title}</span>
										<div className='text-[12.5px] leading-[18px] whitespace-nowrap text-ink-muted'>
											Обновлён {plan.updated}
										</div>
									</Td>
									<Td mono nowrap>
										{plan.teeth}
									</Td>
									<Td>
										<div className='flex items-center gap-2.5'>
											<ProgressBar
												value={percent}
												delay={240 + index * 40}
												className='flex-grow'
												fillClass={
													plan.status === 'done'
														? 'bg-success'
														: plan.status === 'declined'
															? 'bg-line-strong'
															: 'bg-brand'
												}
											/>
											<span className='font-mono text-xs whitespace-nowrap text-ink-muted'>
												{plan.stepsDone} из {plan.stepsTotal}
											</span>
										</div>
									</Td>
									<Td mono nowrap align='right' className='font-semibold'>
										{formatSom(plan.value)}
									</Td>
									<Td>
										<Badge tone={status.tone}>{status.label}</Badge>
									</Td>
									<Td align='right'>
										<IconButton
											quiet
											size='sm'
											aria-label={`Действия: ${plan.patientName}`}
										>
											<Ellipsis size={16} aria-hidden='true' />
										</IconButton>
									</Td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</TableScroll>
		</Card>
	)
}
