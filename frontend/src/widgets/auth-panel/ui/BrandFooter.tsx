'use client'

import { useTranslations } from 'next-intl'

import { BRAND_FOOTER_LINKS } from '../config/BrandPanel'

export function BrandFooter() {
	const t = useTranslations('AuthPanel')
	return (
		<div className='relative flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-white/75'>
			<span>{t('n2026DentaBishkek')}</span>
			{BRAND_FOOTER_LINKS.map(link => (
				<a
					key={link}
					href='#'
					className='text-inherit no-underline hover:text-white hover:underline'
				>
					{t(link)}
				</a>
			))}
		</div>
	)
}
