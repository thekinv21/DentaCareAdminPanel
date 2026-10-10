import {
	Info,
	type LucideIcon,
	OctagonAlert,
	Power,
	Trash2,
} from 'lucide-react'

import type { TButtonVariant } from '@/shared/ui/button'

import type { TConfirmTone, TImpactTone } from './ConfirmTypes'

export const CONFIRM_TONE: Record<
	TConfirmTone,
	{ icon: LucideIcon; iconClass: string; button: TButtonVariant; enter: string }
> = {
	danger: {
		icon: Trash2,
		iconClass: 'bg-danger-soft text-danger',
		button: 'danger',
		enter: 'enterDelete',
	},
	critical: {
		icon: OctagonAlert,
		iconClass: 'bg-danger text-white',
		button: 'danger',
		enter: 'enterDelete',
	},
	warning: {
		icon: Power,
		iconClass: 'bg-warning-soft text-warning',
		button: 'warning',
		enter: 'enterConfirm',
	},
	success: {
		icon: Power,
		iconClass: 'bg-success-soft text-success',
		button: 'primary',
		enter: 'enterConfirm',
	},
	info: {
		icon: Info,
		iconClass: 'bg-info-soft text-info',
		button: 'primary',
		enter: 'enterConfirm',
	},
}

export const IMPACT_CLASS: Record<TImpactTone, string> = {
	danger: 'bg-danger-soft text-danger',
	warning: 'bg-warning-soft text-warning',
	ok: 'bg-success-soft text-success',
	neutral: 'bg-sunken text-ink-muted',
	info: 'bg-info-soft text-info',
}

export const IMPACT_MARK: Record<TImpactTone, string> = {
	danger: '×',
	warning: '•',
	ok: '✓',
	neutral: '•',
	info: '•',
}
