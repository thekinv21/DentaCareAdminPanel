export type TTone =
	'ok' | 'warning' | 'danger' | 'info' | 'accent' | 'brand' | 'neutral'

/**
 * Soft background + strong text pair for each status tone
 */
export const TONE_CLASS: Record<TTone, string> = {
	ok: 'bg-success-soft text-success',
	warning: 'bg-warning-soft text-warning',
	danger: 'bg-danger-soft text-danger',
	info: 'bg-info-soft text-info',
	accent: 'bg-accent-soft text-accent',
	brand: 'bg-brand-soft text-brand-strong',
	neutral: 'bg-sunken text-ink',
}
