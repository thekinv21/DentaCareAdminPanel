'use client'

import { useEffect, useRef, useState } from 'react'

import { type Locale, LOCALE_META, LOCALES, useI18n } from '@/shared/lib/i18n'

/**
 * Open/close state of the language dropdown; closes on outside click and Escape
 */
export function useLanguageMenu() {
	const { locale, setLocale, t } = useI18n()
	const [open, setOpen] = useState(false)
	const rootRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!open) return
		const onPointer = (event: PointerEvent) => {
			if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
		}
		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setOpen(false)
		}
		document.addEventListener('pointerdown', onPointer)
		document.addEventListener('keydown', onKey)
		return () => {
			document.removeEventListener('pointerdown', onPointer)
			document.removeEventListener('keydown', onKey)
		}
	}, [open])

	const options = LOCALES.map(id => ({
		id,
		...LOCALE_META[id],
		selected: id === locale,
	}))

	const pick = (id: Locale) => {
		setOpen(false)
		if (id !== locale) setLocale(id)
	}

	return {
		rootRef,
		open,
		toggle: () => setOpen(current => !current),
		options,
		current: LOCALE_META[locale],
		pick,
		label: t('Язык интерфейса'),
	}
}
