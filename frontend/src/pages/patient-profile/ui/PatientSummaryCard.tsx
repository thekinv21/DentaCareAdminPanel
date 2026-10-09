'use client'

import Link from 'next/link'

import { CalendarDays, MessageSquare, TriangleAlert } from 'lucide-react'

import { cn } from '@/shared/lib/cn'
import { useI18n } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Button, buttonClass } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'

import { PROFILE } from '../model/profile'
import type { ProfileTabsModel } from '../model/use-profile-tabs'

export function PatientSummaryCard({ tabs }: { tabs: ProfileTabsModel }) {
	const { t, format } = useI18n()
	return (
		<Card as='section' className='animate-rise gap-3 pb-0'>
			<div className='flex flex-wrap items-center gap-x-5 gap-y-3.5'>
				<Avatar
					initials={t(PROFILE.initials)}
					tone='brand'
					size={56}
					className='font-display'
				/>
				<div className='flex min-w-0 flex-[1_1_320px] flex-col gap-1'>
					<h2 className='font-display text-[22px] leading-7 font-extrabold tracking-[-0.01em]'>
						{format.name(PROFILE.fullName)}
					</h2>
					<p className='flex flex-wrap gap-x-3.5 gap-y-0.5 text-[12.5px] leading-[18px] text-ink-muted'>
						<span className='font-mono text-ink'>{PROFILE.id}</span>
						<span>{t(PROFILE.details)}</span>
						<span className='font-mono'>{PROFILE.phone}</span>
						<span>{t(PROFILE.doctor)}</span>
					</p>
					<div className='mt-1 flex flex-wrap gap-1.5'>
						{['Аллергия: пенициллин', 'Латекс'].map(allergy => (
							<Badge key={allergy} tone='danger'>
								<TriangleAlert size={13} strokeWidth={2.2} aria-hidden='true' />
								{t(allergy)}
							</Badge>
						))}
						<Badge tone='info'>{t('ФОМС')}</Badge>
						<Badge tone='warning'>{t('Долг 6 400 сом')}</Badge>
					</div>
				</div>
				<div className='flex flex-wrap gap-2'>
					<Button>
						<MessageSquare size={16} aria-hidden='true' />
						{t('Сообщение')}
					</Button>
					<Link href={ROUTES.appointments} className={buttonClass()}>
						<CalendarDays size={16} aria-hidden='true' />
						{t('Записать')}
					</Link>
				</div>
			</div>
			<div
				role='tablist'
				aria-label={t('Разделы карты')}
				className='-mx-[18px] flex gap-0.5 overflow-x-auto border-b border-line px-3 scrollbar-none'
			>
				{tabs.tabs.map(item => (
					<button
						key={item.id}
						type='button'
						role='tab'
						aria-selected={item.selected}
						onClick={() => tabs.setTab(item.id)}
						className={cn(
							'min-h-11 shrink-0 border-0 border-b-2 bg-transparent px-3.5 font-semibold whitespace-nowrap transition-colors duration-150',
							item.selected
								? 'border-brand text-ink'
								: 'border-transparent text-ink-muted hover:text-ink',
						)}
					>
						{item.label}
					</button>
				))}
			</div>
		</Card>
	)
}
