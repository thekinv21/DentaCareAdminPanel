'use client'

import { useEffect, useRef, useState } from 'react'

import { useLocale, useTranslations } from 'next-intl'

import {
	LOCALE_META,
	LOCALES,
	type TLocale,
	useChangeLocale,
} from '@/shared/lib/i18n'

export function useLanguageMenu() {
	const locale = useLocale()

	const setLocale = useChangeLocale()

	const t = useTranslations('LanguageSwitcher')

	const [isOpen, setIsOpen] = useState<boolean>(false)

	const rootRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!isOpen) return

		const onPointer = (event: PointerEvent) => {
			if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false)
		}

		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setIsOpen(false)
		}

		document.addEventListener('pointerdown', onPointer)

		document.addEventListener('keydown', onKey)

		return () => {
			document.removeEventListener('pointerdown', onPointer)

			document.removeEventListener('keydown', onKey)
		}
	}, [isOpen])

	const options = LOCALES.map(id => ({
		id,
		...LOCALE_META[id],
		isSelected: id === locale,
	}))

	const onPick = (id: TLocale): void => {
		setIsOpen(false)

		if (id !== locale) setLocale(id)
	}

	const onToggle = () => {
		setIsOpen(current => !current)
	}

	const current = LOCALE_META[locale]

	const label = t('interfaceLanguage')

	return { rootRef, isOpen, onToggle, options, current, onPick, label }
}

export type TLanguageOption = ReturnType<
	typeof useLanguageMenu
>['options'][number]
