'use client'

import Link from 'next/link'

import { CalendarDays, MessageSquare, TriangleAlert } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Button, buttonClass } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'

import type { TPatientCardModel } from '../model/usePatientCard'
import type { TPatientTabsModel } from '../model/usePatientTabs'
import { PatientTabs } from './PatientTabs'

type TPatientSummaryCardProps = {
	patient: TPatientCardModel
	tabs: TPatientTabsModel
}

export function PatientSummaryCard({
	patient,
	tabs,
}: TPatientSummaryCardProps) {
	const t = useTranslations('PatientProfile')

	return (
		<Card as='section' className='animate-rise gap-3 pb-0'>
			<div className='flex flex-wrap items-center gap-x-5 gap-y-3.5'>
				<Avatar
					initials={patient.initials}
					tone={patient.tone}
					size={56}
					className='font-display'
				/>
				<div className='flex min-w-0 flex-[1_1_320px] flex-col gap-1'>
					<h2 className='font-display text-[22px] leading-7 font-extrabold tracking-[-0.01em]'>
						{patient.name}
					</h2>
					<p className='flex flex-wrap gap-x-3.5 gap-y-0.5 text-[12.5px] leading-4.5 text-ink-muted'>
						<span className='font-mono text-ink'>{patient.id}</span>
						<span>{patient.details}</span>
						<span className='font-mono'>{patient.phone}</span>
						<span>{patient.doctor}</span>
					</p>
					<div className='mt-1 flex flex-wrap gap-1.5'>
						{patient.allergies.map(allergy => (
							<Badge key={allergy} tone='danger'>
								<TriangleAlert size={13} strokeWidth={2.2} aria-hidden='true' />
								{allergy}
							</Badge>
						))}
						{patient.isMhifCovered && <Badge tone='info'>{t('mhif')}</Badge>}
						{patient.balanceDue && (
							<Badge tone='warning'>{patient.balanceDue}</Badge>
						)}
					</div>
				</div>
				<div className='flex flex-wrap gap-2'>
					{/* messaging comes with the backend */}
					<Button disabled>
						<MessageSquare size={16} aria-hidden='true' />
						{t('message')}
					</Button>
					<Link href={ROUTES.appointments} className={buttonClass()}>
						<CalendarDays size={16} aria-hidden='true' />
						{t('book')}
					</Link>
				</div>
			</div>
			<PatientTabs tabs={tabs} />
		</Card>
	)
}
