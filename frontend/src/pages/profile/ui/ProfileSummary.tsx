'use client'

import Link from 'next/link'

import { Camera, Clock, LogOut, Mail, MapPin, Phone } from 'lucide-react'

import { CURRENT_USER } from '@/entities/employee'

import { useI18n } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { buttonClass } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { IconButton } from '@/shared/ui/icon-button'

const STATS = [
	{ value: '1 284', label: 'пациента' },
	{ value: '12', label: 'лет стажа' },
	{ value: '94%', label: 'загрузка' },
]

export function ProfileSummary() {
	const { t, format } = useI18n()
	const contacts = [
		{ icon: Phone, text: '+996 555 701 441', mono: true },
		{ icon: Mail, text: 'a.kasymova@denta.kg' },
		{ icon: MapPin, text: t('Кресло 1 · Бишкек, Ала-Тоо') },
		{ icon: Clock, text: t('Пн–Пт · 08:30–17:30'), mono: true },
	]

	return (
		<Card
			as='aside'
			className='w-[300px] shrink-0 gap-[18px] overflow-auto max-[720px]:w-auto'
		>
			<div className='flex flex-col items-center gap-2.5 pt-2 pb-1 text-center'>
				<span className='relative'>
					<Avatar
						initials={t(CURRENT_USER.initials)}
						tone='accent'
						size={88}
						className='font-display font-extrabold'
					/>
					<IconButton
						aria-label={t('Сменить фото')}
						size='sm'
						round
						className='absolute -right-1 -bottom-1 shadow-clay-sm'
					>
						<Camera size={15} aria-hidden='true' />
					</IconButton>
				</span>
				<div>
					<h2 className='font-display text-[19px] leading-6 font-bold tracking-[-0.01em]'>
						{format.name(CURRENT_USER.fullName)}
					</h2>
					<p className='text-[12.5px] leading-[18px] text-ink-muted'>
						{t(CURRENT_USER.role)} {t('· терапия, эндодонтия')}
					</p>
				</div>
				<div className='flex flex-wrap justify-center gap-1.5'>
					<Badge tone='ok'>{t('● На смене')}</Badge>
					<Badge tone='brand'>{t('Администратор')}</Badge>
				</div>
			</div>

			<dl className='grid grid-cols-3 gap-2 text-center'>
				{STATS.map(stat => (
					<div
						key={stat.label}
						className='flex flex-col-reverse rounded-[14px] bg-raised px-1 py-2.5'
					>
						<dt className='text-[12.5px] leading-[18px] text-ink-muted'>
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
				{t('Выйти из аккаунта')}
			</Link>
		</Card>
	)
}
