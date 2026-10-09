'use client'

import { cn } from '@/shared/lib/cn'
import { useI18n } from '@/shared/lib/i18n'
import { Card } from '@/shared/ui/card'

import type { SettingsModel } from '../model/use-settings'

type SettingsNavProps = Pick<SettingsModel, 'sections' | 'selectSection'>

export function SettingsNav({ sections, selectSection }: SettingsNavProps) {
	const { t } = useI18n()
	return (
		<Card
			as='aside'
			className='w-64 shrink-0 overflow-auto p-2.5 max-[720px]:w-auto'
		>
			<p className='px-3 pt-2 pb-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.06em] text-ink-subtle uppercase'>
				{t('Разделы')}
			</p>
			<div
				role='tablist'
				aria-orientation='vertical'
				aria-label={t('Разделы настроек')}
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
							'flex min-h-[42px] items-center gap-2.5 rounded-xl border-0 px-3 py-1 text-left transition-colors duration-150',
							item.selected
								? 'bg-brand-soft font-semibold text-brand-strong'
								: 'bg-transparent font-medium text-ink-muted hover:bg-raised hover:text-ink',
						)}
					>
						<span className='min-w-0 flex-grow'>
							<span className='block truncate'>{item.label}</span>
							<span className='block truncate text-[12.5px] leading-[18px] font-normal text-ink-muted'>
								{item.hint}
							</span>
						</span>
						{item.badge !== null && (
							<span className='rounded-full bg-sunken px-[7px] font-mono text-[11px] leading-[18px] text-ink'>
								{item.badge}
							</span>
						)}
					</button>
				))}
			</div>
		</Card>
	)
}
