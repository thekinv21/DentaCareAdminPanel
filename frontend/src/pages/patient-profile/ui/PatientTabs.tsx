'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'

import {
	PATIENT_TABPANEL_ID,
	patientTabId,
	type TPatientTabsModel,
} from '../model/usePatientTabs'

type TPatientTabsProps = { tabs: TPatientTabsModel }

/**
 * Tab list of the record sections (arrow keys move the selection)
 */
export function PatientTabs({ tabs }: TPatientTabsProps) {
	const t = useTranslations('PatientProfile')

	return (
		<div
			role='tablist'
			aria-label={t('chartSections')}
			onKeyDown={tabs.onTabKeyDown}
			className='-mx-4.5 flex gap-0.5 overflow-x-auto border-b border-line px-3 scrollbar-none'
		>
			{tabs.tabs.map(tab => (
				<button
					key={tab.id}
					id={patientTabId(tab.id)}
					type='button'
					role='tab'
					aria-selected={tab.isSelected}
					aria-controls={PATIENT_TABPANEL_ID}
					tabIndex={tab.isSelected ? 0 : -1}
					onClick={() => tabs.setTab(tab.id)}
					className={cn(
						'min-h-11 shrink-0 border-0 border-b-2 bg-transparent px-3.5 font-semibold whitespace-nowrap transition-colors duration-150',
						tab.isSelected
							? 'border-brand text-ink'
							: 'border-transparent text-ink-muted hover:text-ink',
					)}
				>
					{tab.label}
				</button>
			))}
		</div>
	)
}
