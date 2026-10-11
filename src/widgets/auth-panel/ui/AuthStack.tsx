import type { ReactNode } from 'react'

type TAuthStackProps = { children: ReactNode }

export function AuthStack({ children }: TAuthStackProps) {
	return <div className='flex animate-rise flex-col gap-5.5'>{children}</div>
}
