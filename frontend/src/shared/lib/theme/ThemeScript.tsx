import { DARK_MEDIA_QUERY, THEME_STORAGE_KEY } from './ThemeConfig'

/**
 * Runs before the first paint so a dark-theme user never sees a light flash
 */
const SCRIPT = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='dark'||(t!=='light'&&matchMedia('${DARK_MEDIA_QUERY}').matches))document.documentElement.classList.add('dark')}catch(e){}`

export function ThemeScript() {
	return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
}
