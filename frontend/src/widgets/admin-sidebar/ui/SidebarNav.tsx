import Link from 'next/link'

import { cn } from '@/shared/lib/cn'

import type { useSidebarNav } from '../model/use-sidebar-nav'

type Groups = ReturnType<typeof useSidebarNav>['groups']

export function SidebarNav({
	groups,
	label,
}: {
	groups: Groups
	label: string
}) {
	return (
		<nav
			aria-label={label}
			className='flex flex-grow flex-col gap-0.5 max-[720px]:flex-grow-0 max-[720px]:flex-row'
		>
			{groups.map(group => (
				<div key={group.label} className='contents'>
					<div className='px-2.5 pt-3.5 pb-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.06em] text-ink-subtle uppercase max-[1100px]:hidden'>
						{group.label}
					</div>
					{group.items.map(item => {
						const Icon = item.icon
						return (
							<Link
								key={item.href}
								href={item.href}
								title={item.label}
								aria-current={item.active ? 'page' : undefined}
								className={cn(
									'flex min-h-10 shrink-0 items-center gap-2.5 rounded-xl px-2.5 no-underline transition-colors duration-150 max-[1100px]:min-w-10 max-[1100px]:justify-center max-[1100px]:px-0',
									item.active
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
	)
}
