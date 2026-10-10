import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'
import { TONE_CLASS } from '@/shared/ui/badge'

type TAuthHeadingProps = {
	title: string
	subtitle: ReactNode
	icon?: ReactNode
	iconTone?: 'brand' | 'ok'
}

export function AuthHeading(props: TAuthHeadingProps) {
	const { title, subtitle, icon, iconTone = 'brand' } = props

	return (
		<>
			{icon && (
				<span
					className={cn(
						'flex size-14 items-center justify-center rounded-[18px]',
						TONE_CLASS[iconTone],
					)}
				>
					{icon}
				</span>
			)}
			<div className='flex flex-col gap-1.5'>
				<h1 className='font-display text-3xl leading-9.5 font-extrabold tracking-tight max-tablet:text-[26px] max-tablet:leading-8'>
					{title}
				</h1>
				<p className='text-sm leading-5.5 text-ink-muted'>{subtitle}</p>
			</div>
		</>
	)
}
