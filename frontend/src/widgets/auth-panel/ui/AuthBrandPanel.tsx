'use client'

import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ToothIcon } from '@/shared/ui/logo'

import { NextPatientPreview } from './NextPatientPreview'

const FEATURES = ['toothChart', 'smsReminders', 'visaMbankKompanionOptima']
const FOOTER_LINKS = ['privacy', 'terms', 'support']

/**
 * Left brand column of auth screens; hidden below 900px
 */
export function AuthBrandPanel() {
	const t = useTranslations('AuthPanel')
	return (
		<section
			aria-label={t('aboutDenta')}
			className="relative flex w-[46%] max-w-165 shrink-0 flex-col justify-between gap-8 overflow-hidden bg-[#075955] px-12 py-10 text-white before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle,rgba(255,255,255,0.13)_1.5px,transparent_2px)] before:bg-size-[28px_28px] before:content-[''] max-[900px]:hidden"
		>
			<span className='pointer-events-none absolute -top-40 -right-45 size-130 rounded-full border border-white/15' />
			<span className='pointer-events-none absolute -top-20 -right-25 size-90 rounded-full border border-white/15' />

			<div className='relative flex items-center gap-3'>
				<span className='flex size-11 items-center justify-center rounded-[14px] bg-white text-[#075955] shadow-[0_10px_24px_-10px_rgba(0,0,0,0.45)]'>
					<ToothIcon size={24} />
				</span>
				<span className='font-display text-2xl font-extrabold'>Denta</span>
			</div>

			<div className='relative flex flex-col gap-7'>
				<p className='max-w-125 font-display text-[38px] leading-11.5 font-extrabold tracking-tight'>
					{t('everyChairEveryTooth')}
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
				<span>{t('n2026DentaBishkek')}</span>
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
