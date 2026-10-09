import type { ReactNode } from 'react'

import { AdminSidebar } from '@/widgets/admin-sidebar'

export function AdminLayout({ children }: { children: ReactNode }) {
	return (
		<div className='flex h-dvh min-h-150 gap-4 overflow-hidden p-4 max-[720px]:h-auto max-[720px]:flex-col max-[720px]:gap-2.5 max-[720px]:overflow-visible max-[720px]:p-2.5'>
			<AdminSidebar />
			<div className='flex h-full min-w-0 flex-auto flex-col max-[720px]:h-auto'>
				{children}
			</div>
		</div>
	)
}
