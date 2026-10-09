'use client'

import { useState } from 'react'

import Link from 'next/link'

import { CalendarDays, MessageSquare, TriangleAlert } from 'lucide-react'

import { DentalChart } from '@/widgets/dental-chart'

import { cn } from '@/shared/lib/cn'
import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Button, buttonClass } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'

import { PROFILE } from '../model/profile'
import {
	PaymentsSection,
	TreatmentPlanSection,
	VisitHistorySection,
} from './ProfileSections'

type Tab = 'chart' | 'plan' | 'history' | 'payments'

const TABS: { id: Tab; label: string }[] = [
	{ id: 'chart', label: 'Зубная формула' },
	{ id: 'plan', label: 'План лечения' },
	{ id: 'history', label: 'История' },
	{ id: 'payments', label: 'Оплаты' },
]

export function PatientProfileView() {
	const [tab, setTab] = useState<Tab>('chart')

	return (
		<>
			<Card as='section' className='animate-rise gap-3 pb-0'>
				<div className='flex flex-wrap items-center gap-x-5 gap-y-3.5'>
					<Avatar
						initials={PROFILE.initials}
						tone='brand'
						size={56}
						className='font-display'
					/>
					<div className='flex min-w-0 flex-[1_1_320px] flex-col gap-1'>
						<h2 className='font-display text-[22px] leading-7 font-extrabold tracking-[-0.01em]'>
							{PROFILE.fullName}
						</h2>
						<p className='flex flex-wrap gap-x-3.5 gap-y-0.5 text-[12.5px] leading-[18px] text-ink-muted'>
							<span className='font-mono text-ink'>{PROFILE.id}</span>
							<span>{PROFILE.details}</span>
							<span className='font-mono'>{PROFILE.phone}</span>
							<span>{PROFILE.doctor}</span>
						</p>
						<div className='mt-1 flex flex-wrap gap-1.5'>
							<Badge tone='danger'>
								<TriangleAlert size={13} strokeWidth={2.2} aria-hidden='true' />
								Аллергия: пенициллин
							</Badge>
							<Badge tone='danger'>
								<TriangleAlert size={13} strokeWidth={2.2} aria-hidden='true' />
								Латекс
							</Badge>
							<Badge tone='info'>ФОМС</Badge>
							<Badge tone='warning'>Долг 6 400 сом</Badge>
						</div>
					</div>
					<div className='flex flex-wrap gap-2'>
						<Button>
							<MessageSquare size={16} aria-hidden='true' />
							Сообщение
						</Button>
						<Link href={ROUTES.appointments} className={buttonClass()}>
							<CalendarDays size={16} aria-hidden='true' />
							Записать
						</Link>
					</div>
				</div>
				<div
					role='tablist'
					aria-label='Разделы карты'
					className='-mx-[18px] flex gap-0.5 overflow-x-auto border-b border-line px-3 scrollbar-none'
				>
					{TABS.map(item => {
						const selected = item.id === tab
						return (
							<button
								key={item.id}
								type='button'
								role='tab'
								aria-selected={selected}
								onClick={() => setTab(item.id)}
								className={cn(
									'min-h-11 shrink-0 border-0 border-b-2 bg-transparent px-3.5 font-semibold whitespace-nowrap transition-colors duration-150',
									selected
										? 'border-brand text-ink'
										: 'border-transparent text-ink-muted hover:text-ink',
								)}
							>
								{item.label}
							</button>
						)
					})}
				</div>
			</Card>

			{tab === 'chart' && <DentalChart />}
			{tab === 'plan' && <TreatmentPlanSection />}
			{tab === 'history' && <VisitHistorySection />}
			{tab === 'payments' && <PaymentsSection />}
		</>
	)
}
