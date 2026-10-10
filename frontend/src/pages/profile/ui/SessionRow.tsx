'use client'

import { Monitor } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'

import type { TProfileSession } from '../model/useProfileSettings'

type TSessionRowProps = { session: TProfileSession }

export function SessionRow({ session }: TSessionRowProps) {
	const t = useTranslations('Profile')

	return (
		<li className='flex items-center gap-3.5 border-b border-line py-3 last:border-b-0'>
			<span className='inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-sunken'>
				<Monitor size={18} aria-hidden='true' />
			</span>
			<div className='min-w-0 grow'>
				<div className='flex items-center gap-2'>
					<span className='font-semibold'>{session.device}</span>
					{session.isCurrent && <Badge tone='ok'>{t('thisSession')}</Badge>}
				</div>
				<p className='text-[12.5px] leading-4.5 text-ink-muted'>
					{session.place}
				</p>
			</div>
			<span className='font-mono text-[12.5px] whitespace-nowrap text-ink-muted'>
				{session.lastActive}
			</span>
			{!session.isCurrent && (
				<Button size='sm' onClick={session.onEnd}>
					{t('endSession')}
				</Button>
			)}
		</li>
	)
}
