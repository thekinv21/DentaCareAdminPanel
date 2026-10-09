import type { ReactNode } from 'react'

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
					className={`flex size-14 items-center justify-center rounded-[18px] ${TONE_CLASS[iconTone]}`}
				>
					{icon}
				</span>
			)}
			<div className='flex flex-col gap-1.5'>
				<h1 className='font-display text-[30px] leading-9.5 font-extrabold tracking-tight max-[900px]:text-[26px] max-[900px]:leading-8'>
					{title}
				</h1>
				<p className='text-sm leading-5.5 text-ink-muted'>{subtitle}</p>
			</div>
		</>
	)
}
