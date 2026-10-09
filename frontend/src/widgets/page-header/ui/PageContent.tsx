import type { ReactNode } from 'react'

type TPageContentProps = { children: ReactNode }

export function PageContent({ children }: TPageContentProps) {
	return (
		<main className='flex min-h-0 flex-auto flex-col gap-4 overflow-auto px-1 pt-0.5 pb-4 scrollbar-thin max-[720px]:overflow-visible'>
			{children}
		</main>
	)
}
