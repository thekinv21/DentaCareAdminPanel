'use client'

import Link from 'next/link'

import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui/avatar'

type TSidebarProfileLinkProps = {
	initials: string
	fullName: string
	role: string
	active: boolean
}

export function SidebarProfileLink(props: TSidebarProfileLinkProps) {
	const { initials, fullName, role, active } = props

	const t = useTranslations('AdminSidebar')

	return (
		<Link
			href={ROUTES.profile}
			title={t('myProfile')}
			aria-current={active ? 'page' : undefined}
			className='flex items-center gap-2.5 rounded-2xl border border-line p-2 text-ink no-underline transition-colors duration-150 hover:bg-raised aria-[current=page]:bg-brand-soft max-laptop:justify-center max-laptop:border-0 max-laptop:p-1 max-mobile:hidden'
		>
			<Avatar initials={initials} tone='accent' size={36} />
			<span className='min-w-0 grow max-laptop:hidden'>
				<span className='block truncate font-semibold'>{fullName}</span>
				<span className='block text-[12.5px] leading-4.5 text-ink-muted'>
					{role}
				</span>
			</span>
			<ChevronRight
				size={16}
				aria-hidden='true'
				className='text-ink-subtle max-laptop:hidden'
			/>
		</Link>
	)
}
