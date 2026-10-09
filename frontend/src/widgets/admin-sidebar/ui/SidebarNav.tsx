import type { useSidebarNav } from '../model/useSidebarNav'
import { SidebarNavGroup } from './SidebarNavGroup'

export type TGroups = ReturnType<typeof useSidebarNav>['groups']

type TSidebarNavProps = {
	groups: TGroups
	label: string
}

export function SidebarNav({ groups, label }: TSidebarNavProps) {
	return (
		<nav
			aria-label={label}
			className='flex grow flex-col gap-0.5 max-[720px]:grow-0 max-[720px]:flex-row'
		>
			<SidebarNavGroup groups={groups} />
		</nav>
	)
}
