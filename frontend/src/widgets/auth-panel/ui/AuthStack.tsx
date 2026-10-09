import type { ReactNode } from 'react'

export function AuthStack({ children }: { children: ReactNode }) {
	return <div className='flex animate-rise flex-col gap-5.5'>{children}</div>
}
