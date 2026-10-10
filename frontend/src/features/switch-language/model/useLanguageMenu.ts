'use client'

import { useEffect, useRef, useState } from 'react'

import { useLocale, useTranslations } from 'next-intl'

import {
	LOCALE_META,
	LOCALES,
	type TLocale,
	useChangeLocale,
} from '@/shared/lib/i18n'

/**
 * Open/close state of the language dropdown; closes on outside click and Escape
 */
export function useLanguageMenu() {
	const locale = useLocale()
	const setLocale = useChangeLocale()
	const t = useTranslations('LanguageSwitcher')

	const [open, setOpen] = useState<boolean>(false)
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

	const pick = (id: TLocale): void => {
		setOpen(false)
		if (id !== locale) setLocale(id)
	}

	const toggle = () => {
		setOpen(current => !current)
	}

	return {
		rootRef,
		open,
		toggle,
		options,
		current: LOCALE_META[locale],
		pick,
		label: t('interfaceLanguage'),
	}
}
