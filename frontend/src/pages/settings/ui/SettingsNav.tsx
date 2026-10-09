'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { Card } from '@/shared/ui/card'

import type { SettingsModel } from '../model/useSettings'

type TSettingsNavProps = Pick<SettingsModel, 'sections' | 'selectSection'>

export function SettingsNav({ sections, selectSection }: TSettingsNavProps) {
	const t = useTranslations('Settings')
	return (
		<Card
			as='aside'
			className='w-64 shrink-0 overflow-auto p-2.5 max-[720px]:w-auto'
		>
			<p className='px-3 pt-2 pb-1.5 text-[11px] leading-3.5 font-semibold tracking-[0.06em] text-ink-subtle uppercase'>
				{t('sections')}
			</p>
			<div
				role='tablist'
				aria-orientation='vertical'
				aria-label={t('settingsSections')}
				className='flex flex-col gap-0.5'
			>
				{sections.map(item => (
					<button
						key={item.id}
						type='button'
						role='tab'
						aria-selected={item.selected}
						onClick={() => selectSection(item.id)}
						className={cn(
							'flex min-h-10.5 items-center gap-2.5 rounded-xl border-0 px-3 py-1 text-left transition-colors duration-150',
							item.selected
								? 'bg-brand-soft font-semibold text-brand-strong'
								: 'bg-transparent font-medium text-ink-muted hover:bg-raised hover:text-ink',
						)}
					>
						<span className='min-w-0 grow'>
							<span className='block truncate'>{item.label}</span>
							<span className='block truncate text-[12.5px] leading-4.5 font-normal text-ink-muted'>
								{item.hint}
							</span>
						</span>
						{item.badge !== null && (
							<span className='rounded-full bg-sunken px-1.75 font-mono text-[11px] leading-4.5 text-ink'>
								{item.badge}
							</span>
						)}
					</button>
				))}
			</div>
		</Card>
	)
}
