'use client'

import { Check } from 'lucide-react'

import { useI18n } from '@/shared/lib/i18n'
import { ToothIcon } from '@/shared/ui/logo'

import { NextPatientPreview } from './NextPatientPreview'

const FEATURES = [
	'Зубная формула',
	'SMS-напоминания',
	'Visa · MBANK · Компаньон · Optima',
]
const FOOTER_LINKS = ['Конфиденциальность', 'Условия', 'Поддержка']

/**
 * Left brand column of auth screens; hidden below 900px
 */
export function AuthBrandPanel() {
	const { t } = useI18n()
	return (
		<section
			aria-label={t('О Denta')}
			className="relative flex w-[46%] max-w-[660px] shrink-0 flex-col justify-between gap-8 overflow-hidden bg-[#075955] px-12 py-10 text-white before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle,rgba(255,255,255,0.13)_1.5px,transparent_2px)] before:bg-[length:28px_28px] before:content-[''] max-[900px]:hidden"
		>
			<span className='pointer-events-none absolute -top-40 -right-[180px] size-[520px] rounded-full border border-white/15' />
			<span className='pointer-events-none absolute -top-20 -right-[100px] size-[360px] rounded-full border border-white/15' />

			<div className='relative flex items-center gap-3'>
				<span className='flex size-11 items-center justify-center rounded-[14px] bg-white text-[#075955] shadow-[0_10px_24px_-10px_rgba(0,0,0,0.45)]'>
					<ToothIcon size={24} />
				</span>
				<span className='font-display text-2xl font-extrabold'>Denta</span>
			</div>

			<div className='relative flex flex-col gap-7'>
				<p className='max-w-[500px] font-display text-[38px] leading-[46px] font-extrabold tracking-[-0.025em]'>
					{t('Каждое кресло, каждый зуб — на одном спокойном экране.')}
				</p>
				<NextPatientPreview />
				<ul className='flex flex-wrap gap-2'>
					{FEATURES.map(feature => (
						<li
							key={feature}
							className='inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[13px] font-semibold'
						>
							<Check size={16} aria-hidden='true' />
							{t(feature)}
						</li>
					))}
				</ul>
			</div>

			<div className='relative flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-white/75'>
				<span>{t('© 2026 Denta · Бишкек')}</span>
				{FOOTER_LINKS.map(link => (
					<a
						key={link}
						href='#'
						className='text-inherit no-underline hover:text-white hover:underline'
					>
						{t(link)}
					</a>
				))}
			</div>
		</section>
	)
}
