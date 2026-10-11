import { Overline } from '@/shared/ui/overline'

import type { TSidebarGroup } from '../model/useSidebarNav'
import { SidebarNavItem } from './SidebarNavItem'

type TSidebarNavGroupProps = {
	group: TSidebarGroup
}

export function SidebarNavGroup({ group }: TSidebarNavGroupProps) {
	return (
		<div className='contents'>
			<Overline
				tone='subtle'
				className='px-2.5 pt-3.5 pb-1.5 max-laptop:hidden'
			>
				{group.label}
			</Overline>
			{group.items.map(item => (
				<SidebarNavItem key={item.href} item={item} />
			))}
		</div>
	)
}
