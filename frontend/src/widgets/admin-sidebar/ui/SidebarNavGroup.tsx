import { TGroups } from './SidebarNav'
import { SidebarNavGroupItems } from './SidebarNavGroupItems'

type TSidebarNavGroupProps = {
	groups: TGroups
}

export function SidebarNavGroup({ groups }: TSidebarNavGroupProps) {
	return (
		<>
			{groups.map(group => (
				<div key={group.label} className='contents'>
					<div className='px-2.5 pt-3.5 pb-1.5 text-[11px] leading-3.5 font-semibold tracking-[0.06em] text-ink-subtle uppercase max-[1100px]:hidden'>
						{group.label}
					</div>
					<SidebarNavGroupItems items={group.items} />
				</div>
			))}
		</>
	)
}
