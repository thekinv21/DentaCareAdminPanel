import Link from 'next/link'

import { TriangleAlert } from 'lucide-react'

import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Button, buttonClass } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'

const PATIENT_ID = 'DN-20418'

export function NextPatientCard() {
	return (
		<Card
			as='section'
			aria-label='Следующий пациент'
			className='flex-[1_1_280px] animate-rise outline-[1.5px] -outline-offset-[1.5px] outline-accent-soft outline-solid'
			style={{ animationDelay: '250ms' }}
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<span className='inline-flex items-center gap-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.06em] text-accent uppercase'>
					<span className='size-[7px] animate-blink rounded-full bg-accent' />
					Следующий пациент
				</span>
				<span className='font-mono text-[12.5px] font-semibold text-accent'>
					12:00 · через 20 мин
				</span>
			</div>

			<div className='flex items-center gap-3'>
				<Avatar initials='АТ' tone='brand' size={48} />
				<div className='min-w-0'>
					<div className='font-display text-lg leading-6 font-bold'>
						Айгуль Тойчубекова
					</div>
					<div className='text-[12.5px] leading-[18px] text-ink-muted'>
						<span className='font-mono'>{PATIENT_ID}</span> · 34 года ·
						отметилась
					</div>
				</div>
			</div>

			<dl className='grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 rounded-[14px] bg-raised p-3'>
				<dt className='text-ink-muted'>Услуга</dt>
				<dd className='text-right font-semibold'>
					Лечение каналов · <span className='font-mono'>46</span>
				</dd>
				<dt className='text-ink-muted'>Кресло</dt>
				<dd className='text-right font-semibold'>Кресло 1 · Касымова А.</dd>
				<dt className='text-ink-muted'>Длительность</dt>
				<dd className='text-right font-semibold'>90 мин</dd>
			</dl>

			<div className='flex flex-wrap gap-1.5'>
				<Badge tone='danger'>
					<TriangleAlert size={13} strokeWidth={2.2} aria-hidden='true' />
					Аллергия: пенициллин
				</Badge>
				<Badge tone='info'>ФОМС</Badge>
			</div>

			<div className='mt-auto flex gap-2'>
				<Button className='flex-1'>Пригласить</Button>
				<Link
					href={ROUTES.patient(PATIENT_ID)}
					className={buttonClass({ variant: 'primary', className: 'flex-1' })}
				>
					Открыть карту
				</Link>
			</div>
		</Card>
	)
}
