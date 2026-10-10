import type { ReactNode } from 'react'

import { AuthBrandPanel, AuthTopBar } from '@/widgets/auth-panel'

type TAuthLayoutProps = { children: ReactNode }

export function AuthLayout({ children }: TAuthLayoutProps) {
	return (
		<div className='flex h-dvh min-h-155 max-tablet:h-auto max-tablet:min-h-dvh'>
			<AuthBrandPanel />
			<section className='flex h-full min-w-0 flex-auto flex-col overflow-auto px-7 pt-5 pb-7 max-tablet:h-auto max-tablet:overflow-visible max-tablet:px-5 max-tablet:pt-4'>
				<AuthTopBar />
				<div className='flex flex-[1_0_auto] items-center justify-center py-6 max-tablet:items-start'>
					<div className='w-full max-w-105'>{children}</div>
				</div>
			</section>
		</div>
	)
}
