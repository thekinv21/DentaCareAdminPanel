'use client'

import Link from 'next/link'

import { TriangleAlert } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { useFormat } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Button, buttonClass } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'

const PATIENT_ID = 'DN-20418'

export function NextPatientCard() {
	const t = useTranslations('Dashboard')
	const format = useFormat()
	const details = [
		{
			label: t('service'),
			value: (
				<>
					{t('rootCanalTreatment')} <span className='font-mono'>46</span>
				</>
			),
		},
		{
			label: t('chair'),
			value: `${t('chair1')} · ${format.name('Касымова А.')}`,
		},
		{ label: t('duration'), value: t('n90Min') },
	]

	return (
		<Card
			as='section'
			aria-label={t('nextPatient')}
			className='flex-[1_1_280px] animate-rise outline-[1.5px] outline-offset-[-1.5px] outline-accent-soft outline-solid'
			style={{ animationDelay: '250ms' }}
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<span className='inline-flex items-center gap-1.5 text-[11px] leading-3.5 font-semibold tracking-[0.06em] text-accent uppercase'>
					<span className='size-1.75 animate-blink rounded-full bg-accent' />
					{t('nextPatient')}
				</span>
				<span className='font-mono text-[12.5px] font-semibold text-accent'>
					{t('n1200In20')}
				</span>
			</div>

			<div className='flex items-center gap-3'>
				<Avatar initials={t('at')} tone='brand' size={48} />
				<div className='min-w-0'>
					<div className='font-display text-lg leading-6 font-bold'>
						{format.name('Айгуль Тойчубекова')}
					</div>
					<div className='text-[12.5px] leading-4.5 text-ink-muted'>
						<span className='font-mono'>{PATIENT_ID}</span> {t('n34YCheckedIn')}
					</div>
				</div>
			</div>

			<dl className='grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 rounded-[14px] bg-raised p-3'>
				{details.map(item => (
					<div key={item.label} className='contents'>
						<dt className='text-ink-muted'>{item.label}</dt>
						<dd className='text-right font-semibold'>{item.value}</dd>
					</div>
				))}
			</dl>

			<div className='flex flex-wrap gap-1.5'>
				<Badge tone='danger'>
					<TriangleAlert size={13} strokeWidth={2.2} aria-hidden='true' />
					{t('allergyPenicillin')}
				</Badge>
				<Badge tone='info'>{t('mhif')}</Badge>
			</div>

			<div className='mt-auto flex gap-2'>
				<Button className='flex-1'>{t('invite')}</Button>
				<Link
					href={ROUTES.patient(PATIENT_ID)}
					className={buttonClass({ variant: 'primary', className: 'flex-1' })}
				>
					{t('openChart')}
				</Link>
			</div>
		</Card>
	)
}
