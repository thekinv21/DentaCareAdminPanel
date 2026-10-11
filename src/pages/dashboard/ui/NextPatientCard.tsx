'use client'

import Link from 'next/link'

import { TriangleAlert } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Button, buttonClass } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Overline } from '@/shared/ui/overline'

import { useNextPatient } from '../model/useNextPatient'

export function NextPatientCard() {
	const t = useTranslations('Dashboard')
	const nextPatient = useNextPatient()
	if (!nextPatient) return null

	return (
		<Card
			as='section'
			aria-label={t('nextPatient')}
			className='flex-[1_1_280px] animate-rise outline-[1.5px] outline-offset-[-1.5px] outline-accent-soft outline-solid'
			style={{ animationDelay: '250ms' }}
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<Overline
					as='span'
					tone='accent'
					className='inline-flex items-center gap-1.5'
				>
					<span className='size-1.75 animate-blink rounded-full bg-accent' />
					{t('nextPatient')}
				</Overline>
				<span className='font-mono text-[12.5px] font-semibold text-accent'>
					{nextPatient.startsIn}
				</span>
			</div>

			<div className='flex items-center gap-3'>
				<Avatar
					initials={nextPatient.initials}
					tone={nextPatient.tone}
					size={48}
				/>
				<div className='min-w-0'>
					<div className='font-display text-lg leading-6 font-bold'>
						{nextPatient.name}
					</div>
					<div className='text-[12.5px] leading-4.5 text-ink-muted'>
						<span className='font-mono'>{nextPatient.patientId}</span>{' '}
						{nextPatient.meta}
					</div>
				</div>
			</div>

			<dl className='grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 rounded-[14px] bg-raised p-3'>
				{nextPatient.details.map(detail => (
					<div key={detail.label} className='contents'>
						<dt className='text-ink-muted'>{detail.label}</dt>
						<dd className='text-right font-semibold'>{detail.value}</dd>
					</div>
				))}
			</dl>

			<div className='flex flex-wrap gap-1.5'>
				{nextPatient.hasAllergy && (
					<Badge tone='danger'>
						<TriangleAlert size={13} strokeWidth={2.2} aria-hidden='true' />
						{t('allergyPenicillin')}
					</Badge>
				)}
				{nextPatient.isMhifCovered && <Badge tone='info'>{t('mhif')}</Badge>}
			</div>

			<div className='mt-auto flex gap-2'>
				{/* inviting to the chair comes with the realtime queue */}
				<Button className='flex-1' disabled>
					{t('invite')}
				</Button>
				<Link
					href={ROUTES.patient(nextPatient.patientId)}
					className={buttonClass({ variant: 'primary', className: 'flex-1' })}
				>
					{t('openChart')}
				</Link>
			</div>
		</Card>
	)
}
