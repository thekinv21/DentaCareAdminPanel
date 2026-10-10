'use client'

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useMemo,
	useSyncExternalStore,
} from 'react'

import { DARK_MEDIA_QUERY, THEME_STORAGE_KEY } from './ThemeConfig'

export type TThemePreference = 'system' | 'light' | 'dark'

type TThemeContextValue = {
	theme: TThemePreference
	setTheme: (theme: TThemePreference) => void
}

const CHANGE_EVENT = 'denta-theme-change'

const ThemeContext = createContext<TThemeContextValue | null>(null)

function readStoredTheme(): TThemePreference {
	try {
		const value = window.localStorage.getItem(THEME_STORAGE_KEY)
		return value === 'light' || value === 'dark' ? value : 'system'
	} catch {
		return 'system'
	}
}

function subscribe(onChange: () => void) {
	window.addEventListener(CHANGE_EVENT, onChange)
	window.addEventListener('storage', onChange)
	return () => {
		window.removeEventListener(CHANGE_EVENT, onChange)

		window.removeEventListener('storage', onChange)
	}
}

function setTheme(next: TThemePreference) {
	try {
		window.localStorage.setItem(THEME_STORAGE_KEY, next)
	} catch {
		// storage can be unavailable (private mode); the change is lost on reload
	}

	window.dispatchEvent(new Event(CHANGE_EVENT))
}

function applyTheme(theme: TThemePreference) {
	const isDark =
		theme === 'dark' ||
		(theme === 'system' && window.matchMedia(DARK_MEDIA_QUERY).matches)

	document.documentElement.classList.toggle('dark', isDark)
}

type TThemeProviderProps = { children: ReactNode }

export function ThemeProvider({ children }: TThemeProviderProps) {
	const theme = useSyncExternalStore(
		subscribe,
		readStoredTheme,
		() => 'system' as const,
	)

	useEffect(() => {
		applyTheme(theme)

		if (theme !== 'system') return

		const media = window.matchMedia(DARK_MEDIA_QUERY)

		const onChange = () => applyTheme('system')

		media.addEventListener('change', onChange)

		return () => media.removeEventListener('change', onChange)
	}, [theme])

	const value = useMemo(() => ({ theme, setTheme }), [theme])

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): TThemeContextValue {
	const context = useContext(ThemeContext)

	if (!context) throw new Error('useTheme must be used inside ThemeProvider')

	return context
}
