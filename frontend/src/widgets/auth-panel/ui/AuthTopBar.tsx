'use client'

import Link from 'next/link'

import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { LanguageSwitcher } from '@/features/switch-language'

import { ROUTES } from '@/shared/routes'
import { buttonClass } from '@/shared/ui/button'
import { LogoMark } from '@/shared/ui/logo'

import { useIsEntryRoute } from '../model/useIsEntryRoute'

export function AuthTopBar() {
	const t = useTranslations('AuthPanel')

	const isEntry = useIsEntryRoute()

	return (
		<div className='flex min-h-11 shrink-0 items-center gap-3'>
			{isEntry ? (
				<div className='hidden items-center gap-2.5 max-tablet:flex'>
					<LogoMark />
					<span className='font-display text-xl font-extrabold'>Denta</span>
				</div>
			) : (
				<Link
					href={ROUTES.login}
					className={buttonClass({
						variant: 'ghost',
						className: 'px-2.5 text-ink-muted hover:text-ink',
					})}
				>
					<ChevronLeft size={18} aria-hidden='true' />
					{t('backToSignIn')}
				</Link>
			)}
			<span className='grow' />
			<LanguageSwitcher variant='full' />
		</div>
	)
}
