import type { TSidebarGroup } from '../model/useSidebarNav'
import { SidebarNavItem } from './SidebarNavItem'

type TSidebarNavGroupProps = {
	group: TSidebarGroup
}

export function SidebarNavGroup({ group }: TSidebarNavGroupProps) {
	return (
		<div className='contents'>
			<div className='px-2.5 pt-3.5 pb-1.5 text-[11px] leading-3.5 font-semibold tracking-[0.06em] text-ink-subtle uppercase max-[1100px]:hidden'>
				{group.label}
			</div>
			{group.items.map(item => (
				<SidebarNavItem key={item.href} item={item} />
			))}
		</div>
	)
}
