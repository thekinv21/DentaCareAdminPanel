'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { translateOptional } from '@/shared/lib/i18n'

import type { LanguageId } from './Communication'
import { INITIAL_TOGGLES, type SectionId, SECTIONS } from './Sections'

const BANKS = ['visa', 'mbank', 'komp', 'optima']

/**
 * Active section, every on/off preference and the save/dirty state
 */
export function useSettings() {
	const t = useTranslations('Settings')
	const [section, setSection] = useState<SectionId>('pay')
	const [toggles, setToggles] = useState(INITIAL_TOGGLES)
	const [defaultLanguage, setDefaultLanguageState] = useState<LanguageId>('ru')
	const [saved, setSaved] = useState(false)
	const [dirty, setDirty] = useState(false)

	const touch = () => {
		setSaved(false)
		setDirty(true)
	}

	const current = SECTIONS.find(item => item.id === section) ?? SECTIONS[0]

	return {
		section,
		sections: SECTIONS.map(item => ({
			id: item.id,
			label: t(item.label),
			hint: translateOptional(t, item.hint),
			selected: item.id === section,
			badge:
				item.id === 'pay' ? BANKS.filter(bank => toggles[bank]).length : null,
		})),
		selectSection: (id: SectionId) => {
			setSection(id)
			setSaved(false)
		},
		current: { label: t(current.label), description: t(current.description) },
		toggles,
		flip: (id: string) => {
			setToggles(state => ({ ...state, [id]: !state[id] }))
			touch()
		},
		defaultLanguage,
		setDefaultLanguage: (id: LanguageId) => {
			setDefaultLanguageState(id)
			touch()
		},
		saved,
		dirty,
		save: () => {
			setSaved(true)
			setDirty(false)
		},
		reset: () => {
			setToggles(INITIAL_TOGGLES)
			setDefaultLanguageState('ru')
			setSaved(false)
			setDirty(false)
		},
	}
}

export type SettingsModel = ReturnType<typeof useSettings>
export type TogglesProps = Pick<SettingsModel, 'toggles' | 'flip'>
