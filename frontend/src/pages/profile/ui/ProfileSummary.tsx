'use client'

import Link from 'next/link'

import { Camera, Clock, LogOut, Mail, MapPin, Phone } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { useCurrentUser } from '@/entities/employee'

import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { buttonClass } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { IconButton } from '@/shared/ui/icon-button'

const STATS = [
	{ value: '1 284', label: 'patients' },
	{ value: '12', label: 'yearsOfExperience' },
	{ value: '94%', label: 'chairLoad' },
]

export function ProfileSummary() {
	const t = useTranslations('Profile')
	const user = useCurrentUser()
	const contacts = [
		{ icon: Phone, text: '+996 555 701 441', mono: true },
		{ icon: Mail, text: 'a.kasymova@denta.kg' },
		{ icon: MapPin, text: t('chair1BishkekAla') },
		{ icon: Clock, text: t('monFri0830'), mono: true },
	]

	return (
		<Card
			as='aside'
			className='w-75 shrink-0 gap-4.5 overflow-auto max-[720px]:w-auto'
		>
			<div className='flex flex-col items-center gap-2.5 pt-2 pb-1 text-center'>
				<span className='relative'>
					<Avatar
						initials={user.initials}
						tone='accent'
						size={88}
						className='font-display font-extrabold'
					/>
					<IconButton
						aria-label={t('changePhoto')}
						size='sm'
						round
						className='absolute -right-1 -bottom-1 shadow-clay-sm'
					>
						<Camera size={15} aria-hidden='true' />
					</IconButton>
				</span>
				<div>
					<h2 className='font-display text-[19px] leading-6 font-bold tracking-[-0.01em]'>
						{user.fullName}
					</h2>
					<p className='text-[12.5px] leading-4.5 text-ink-muted'>
						{user.role} {t('generalDentistryEndodontics')}
					</p>
				</div>
				<div className='flex flex-wrap justify-center gap-1.5'>
					<Badge tone='ok'>{t('onShift')}</Badge>
					<Badge tone='brand'>{t('administrator')}</Badge>
				</div>
			</div>

			<dl className='grid grid-cols-3 gap-2 text-center'>
				{STATS.map(stat => (
					<div
						key={stat.label}
						className='flex flex-col-reverse rounded-[14px] bg-raised px-1 py-2.5'
					>
						<dt className='text-[12.5px] leading-4.5 text-ink-muted'>
							{t(stat.label)}
						</dt>
						<dd className='font-mono text-base font-bold'>{stat.value}</dd>
					</div>
				))}
			</dl>

			<ul className='flex flex-col gap-3 text-[13px]'>
				{contacts.map(({ icon: Icon, text, mono }) => (
					<li key={text} className='flex items-center gap-2.5'>
						<Icon
							size={16}
							aria-hidden='true'
							className='shrink-0 text-ink-subtle'
						/>
						<span className={mono ? 'font-mono' : 'truncate'}>{text}</span>
					</li>
				))}
			</ul>

			<Link
				href={ROUTES.login}
				className={buttonClass({ variant: 'danger', className: 'mt-auto' })}
			>
				<LogOut size={16} aria-hidden='true' />
				{t('signOutOfAccount')}
			</Link>
		</Card>
	)
}
