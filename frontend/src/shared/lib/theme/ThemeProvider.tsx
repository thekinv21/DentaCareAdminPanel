'use client'

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useMemo,
	useSyncExternalStore,
} from 'react'

export type ThemePreference = 'system' | 'light' | 'dark'

interface ThemeContextValue {
	theme: ThemePreference
	setTheme: (theme: ThemePreference) => void
}

const STORAGE_KEY = 'denta-theme'
const CHANGE_EVENT = 'denta-theme-change'

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readStoredTheme(): ThemePreference {
	try {
		const value = window.localStorage.getItem(STORAGE_KEY)
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

function setTheme(next: ThemePreference) {
	try {
		window.localStorage.setItem(STORAGE_KEY, next)
	} catch {
		// storage can be unavailable (private mode); the change is lost on reload
	}
	window.dispatchEvent(new Event(CHANGE_EVENT))
}

function applyTheme(theme: ThemePreference) {
	const isDark =
		theme === 'dark' ||
		(theme === 'system' &&
			window.matchMedia('(prefers-color-scheme: dark)').matches)
	document.documentElement.classList.toggle('dark', isDark)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const theme = useSyncExternalStore(
		subscribe,
		readStoredTheme,
		() => 'system' as const,
	)

	useEffect(() => {
		applyTheme(theme)
		if (theme !== 'system') return

		const media = window.matchMedia('(prefers-color-scheme: dark)')
		const onChange = () => applyTheme('system')
		media.addEventListener('change', onChange)
		return () => media.removeEventListener('change', onChange)
	}, [theme])

	const value = useMemo(() => ({ theme, setTheme }), [theme])

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
	const context = useContext(ThemeContext)
	if (!context) throw new Error('useTheme must be used inside ThemeProvider')
	return context
}
