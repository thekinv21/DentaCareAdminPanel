import type { TProfileField } from './Profile'

/**
 * Personal details, password change and notification preferences of the profile
 */
export type TProfileFormValues = {
	profile: Record<TProfileField, string>
	defaultChair: 'chair1' | 'chair2'
	scheduleView: 'week' | 'day' | 'month'
	signature: string
	password: { current: string; next: string; repeat: string }
	/**
	 * Security switches and event × channel notification switches
	 */
	prefs: Record<string, boolean>
	doNotDisturb: string
	daySummary: 'daily' | 'never'
}
