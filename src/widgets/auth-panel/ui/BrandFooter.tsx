import { useTranslations } from 'next-intl'

import { BRAND_FOOTER_LINKS, COPYRIGHT_YEAR } from '../config/BrandPanel'

export function BrandFooter() {
	const t = useTranslations('AuthPanel')

	return (
		<div className='relative flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-white/75'>
			<span>{t('copyright', { year: COPYRIGHT_YEAR })}</span>
			{BRAND_FOOTER_LINKS.map(link => (
				<span key={link}>{t(link)}</span>
			))}
		</div>
	)
}
