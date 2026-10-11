import type { ReactNode } from 'react'

import { AdminSidebar } from '@/widgets/admin-sidebar'

type TAdminLayoutProps = { children: ReactNode }

export function AdminLayout({ children }: TAdminLayoutProps) {
	return (
		<div className='flex h-dvh min-h-150 gap-4 overflow-hidden p-4 max-mobile:h-auto max-mobile:flex-col max-mobile:gap-2.5 max-mobile:overflow-visible max-mobile:p-2.5'>
			<AdminSidebar />
			<div className='flex h-full min-w-0 flex-auto flex-col max-mobile:h-auto'>
				{children}
			</div>
		</div>
	)
}
