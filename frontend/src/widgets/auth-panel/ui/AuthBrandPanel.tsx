import { useTranslations } from 'next-intl'

import { BrandFeatureList } from './BrandFeatureList'
import { BrandFooter } from './BrandFooter'
import { BrandLogo } from './BrandLogo'
import { BrandRings } from './BrandRings'
import { NextPatientPreview } from './NextPatientPreview'

/**
 * Left half of the auth screens; always light, whatever the theme
 */
export function AuthBrandPanel() {
	const t = useTranslations('AuthPanel')

	return (
		<section
			aria-label={t('aboutDenta')}
			className="theme-light relative flex w-[46%] max-w-165 shrink-0 flex-col justify-between gap-8 overflow-hidden bg-brand-strong px-12 py-10 text-white before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle,rgba(255,255,255,0.13)_1.5px,transparent_2px)] before:bg-size-[28px_28px] before:content-[''] max-tablet:hidden"
		>
			<BrandRings />
			<BrandLogo />

			<div className='relative flex flex-col gap-7'>
				<p className='max-w-125 font-display text-[38px] leading-11.5 font-extrabold tracking-tight'>
					{t('everyChairEveryTooth')}
				</p>
				<NextPatientPreview />
				<BrandFeatureList />
			</div>

			<BrandFooter />
		</section>
	)
}
