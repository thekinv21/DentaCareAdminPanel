import { avatarTone } from '@/shared/ui/avatar'
import type { TTone } from '@/shared/ui/badge'

/**
 * Avatar tone derived from the patient id, so one patient keeps one color on every screen
 */
export function patientAvatarTone(patientId: string): TTone {
	let hash = 0
	for (const char of patientId) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
	return avatarTone(hash)
}
