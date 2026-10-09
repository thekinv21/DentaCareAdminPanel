import Link from 'next/link'

import { cn } from '@/shared/lib/cn'

import type { TSidebarItem } from '../model/useSidebarNav'

type TSidebarNavItemProps = {
	item: TSidebarItem
}

export function SidebarNavItem({ item }: TSidebarNavItemProps) {
	const Icon = item.icon
	return (
		<Link
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
			<span className='grow truncate max-[1100px]:sr-only'>{item.label}</span>
			{item.count && (
				<span
					className={cn(
						'rounded-full px-1.75 font-mono text-[11px] leading-4.5 max-[1100px]:hidden',
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
}
