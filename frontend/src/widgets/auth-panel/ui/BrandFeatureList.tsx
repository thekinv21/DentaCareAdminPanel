'use client'

import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { BRAND_FEATURES } from '../config/BrandPanel'

export function BrandFeatureList() {
	const t = useTranslations('AuthPanel')
	return (
		<ul className='flex flex-wrap gap-2'>
			{BRAND_FEATURES.map(feature => (
				<li
					key={feature}
					className='inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[13px] font-semibold'
				>
					<Check size={16} aria-hidden='true' />
					{t(feature)}
				</li>
			))}
		</ul>
	)
}
