'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ChevronRight } from 'lucide-react'

import { CURRENT_USER } from '@/entities/employee'

import { cn } from '@/shared/lib/cn'
import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui/avatar'
import { LogoMark } from '@/shared/ui/logo'

import { NAVIGATION } from '../config/navigation'

function isActive(pathname: string, href: string) {
	if (href === ROUTES.dashboard) return pathname === href
	return pathname === href || pathname.startsWith(`${href}/`)
}

export function AdminSidebar() {
	const pathname = usePathname() ?? ''

	return (
		<aside
			aria-label='Меню'
			className='flex h-full w-[244px] shrink-0 flex-col gap-2 overflow-y-auto rounded-[22px] bg-surface px-3 py-3.5 shadow-clay-md scrollbar-none max-[1100px]:w-[68px] max-[1100px]:px-2 max-[1100px]:py-3 max-[720px]:h-auto max-[720px]:w-auto max-[720px]:flex-row max-[720px]:items-center max-[720px]:overflow-x-auto max-[720px]:rounded-2xl max-[720px]:p-2'
		>
			<div className='flex items-center gap-2.5 border-b border-line px-1 pt-0.5 pb-3 max-[1100px]:justify-center max-[1100px]:px-0 max-[720px]:border-0 max-[720px]:p-0'>
				<LogoMark />
				<span className='min-w-0 flex-grow max-[1100px]:hidden'>
					<span className='block font-display text-lg leading-[22px] font-extrabold tracking-[-0.01em]'>
						Denta
					</span>
					<span className='block truncate text-[12.5px] leading-[18px] text-ink-muted'>
						{CURRENT_USER.branch}
					</span>
				</span>
			</div>

			<nav
				aria-label='Основное меню'
				className='flex flex-grow flex-col gap-0.5 max-[720px]:flex-grow-0 max-[720px]:flex-row'
			>
				{NAVIGATION.map(group => (
					<div key={group.label} className='contents'>
						<div className='px-2.5 pt-3.5 pb-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.06em] text-ink-subtle uppercase max-[1100px]:hidden'>
							{group.label}
						</div>
						{group.items.map(item => {
							const active = isActive(pathname, item.href)
							const Icon = item.icon
							return (
								<Link
									key={item.href}
									href={item.href}
									title={item.label}
									aria-current={active ? 'page' : undefined}
									className={cn(
										'flex min-h-10 shrink-0 items-center gap-2.5 rounded-xl px-2.5 no-underline transition-colors duration-150 max-[1100px]:min-w-10 max-[1100px]:justify-center max-[1100px]:px-0',
										active
											? 'bg-brand-soft font-semibold text-brand-strong'
											: 'font-medium text-ink-muted hover:bg-raised hover:text-ink',
									)}
								>
									<Icon size={19} aria-hidden='true' />
									<span className='flex-grow truncate max-[1100px]:sr-only'>
										{item.label}
									</span>
									{item.count && (
										<span
											className={cn(
												'rounded-full px-[7px] font-mono text-[11px] leading-[18px] max-[1100px]:hidden',
												item.count.warning
													? 'bg-warning-soft text-warning'
													: 'bg-sunken text-ink',
											)}
										>
											{item.count.value}
										</span>
									)}
								</Link>
							)
						})}
					</div>
				))}
			</nav>

			<Link
				href={ROUTES.profile}
				title='Мой профиль'
				aria-current={isActive(pathname, ROUTES.profile) ? 'page' : undefined}
				className='flex items-center gap-2.5 rounded-2xl border border-line p-2 text-ink no-underline transition-colors duration-150 hover:bg-raised aria-[current=page]:bg-brand-soft max-[1100px]:justify-center max-[1100px]:border-0 max-[1100px]:p-1 max-[720px]:hidden'
			>
				<Avatar initials={CURRENT_USER.initials} tone='accent' size={36} />
				<span className='min-w-0 flex-grow max-[1100px]:hidden'>
					<span className='block truncate font-semibold'>
						{CURRENT_USER.fullName}
					</span>
					<span className='block text-[12.5px] leading-[18px] text-ink-muted'>
						{CURRENT_USER.role}
					</span>
				</span>
				<ChevronRight
					size={16}
					aria-hidden='true'
					className='text-ink-subtle max-[1100px]:hidden'
				/>
			</Link>
		</aside>
	)
}
