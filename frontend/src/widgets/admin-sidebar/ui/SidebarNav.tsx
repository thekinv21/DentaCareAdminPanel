import type { TSidebarGroup } from '../model/useSidebarNav'
import { SidebarNavGroup } from './SidebarNavGroup'

type TSidebarNavProps = {
	groups: TSidebarGroup[]
	label: string
}

export function SidebarNav({ groups, label }: TSidebarNavProps) {
	return (
		<nav
			aria-label={label}
			className='flex grow flex-col gap-0.5 max-[720px]:grow-0 max-[720px]:flex-row'
		>
			{groups.map(group => (
				<SidebarNavGroup key={group.label} group={group} />
			))}
		</nav>
	)
}
