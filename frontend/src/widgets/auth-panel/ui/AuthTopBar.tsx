'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ChevronLeft } from 'lucide-react'

import { LanguageSwitcher } from '@/features/switch-language'

import { useI18n } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'
import { buttonClass } from '@/shared/ui/button'
import { LogoMark } from '@/shared/ui/logo'

const ENTRY_ROUTES: string[] = [ROUTES.login, ROUTES.register]

/**
 * Entry screens show the logo on small screens; the rest link back to sign-in
 */
export function AuthTopBar() {
	const { t } = useI18n()
	const isEntry = ENTRY_ROUTES.includes(usePathname() ?? '')

	return (
		<div className='flex min-h-11 shrink-0 items-center gap-3'>
			{isEntry ? (
				<div className='hidden items-center gap-2.5 max-[900px]:flex'>
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
					{t('Ко входу')}
				</Link>
			)}
			<span className='flex-grow' />
			<LanguageSwitcher variant='full' />
		</div>
	)
}
