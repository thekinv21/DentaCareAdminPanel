'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { Card } from '@/shared/ui/card'
import { Overline } from '@/shared/ui/overline'

import type { TSettingsModel } from '../model/useSettings'

export const SETTINGS_PANEL_ID = 'settings-panel'

type TSettingsSection = TSettingsModel['sections'][number]

type TSettingsNavProps = Pick<TSettingsModel, 'sections' | 'selectSection'>

export function SettingsNav({ sections, selectSection }: TSettingsNavProps) {
	const t = useTranslations('Settings')

	return (
		<Card
			as='aside'
			className='w-64 shrink-0 overflow-auto p-2.5 max-mobile:w-auto'
		>
			<Overline as='p' tone='subtle' className='px-3 pt-2 pb-1.5'>
				{t('sections')}
			</Overline>
			<div
				role='tablist'
				aria-orientation='vertical'
				aria-label={t('settingsSections')}
				className='flex flex-col gap-0.5'
			>
				{sections.map(section => (
					<SettingsNavTab
						key={section.id}
						section={section}
						onSelect={() => selectSection(section.id)}
					/>
				))}
			</div>
		</Card>
	)
}

type TSettingsNavTabProps = {
	section: TSettingsSection
	onSelect: () => void
}

function SettingsNavTab({ section, onSelect }: TSettingsNavTabProps) {
	return (
		<button
			id={`settings-tab-${section.id}`}
			type='button'
			role='tab'
			aria-selected={section.isSelected}
			aria-controls={SETTINGS_PANEL_ID}
			onClick={onSelect}
			className={cn(
				'flex min-h-10.5 items-center gap-2.5 rounded-xl border-0 px-3 py-1 text-left transition-colors duration-150',
				section.isSelected
					? 'bg-brand-soft font-semibold text-brand-strong'
					: 'bg-transparent font-medium text-ink-muted hover:bg-raised hover:text-ink',
			)}
		>
			<span className='min-w-0 grow'>
				<span className='block truncate'>{section.label}</span>
				<span className='block truncate text-[12.5px] leading-4.5 font-normal text-ink-muted'>
					{section.hint}
				</span>
			</span>
			{section.badge !== null && (
				<span className='rounded-full bg-sunken px-1.75 font-mono text-[11px] leading-4.5 text-ink'>
					{section.badge}
				</span>
			)}
		</button>
	)
}
