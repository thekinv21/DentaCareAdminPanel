import { USERS } from '@/entities/user'

import { getShortName } from '@/shared/lib/format'

/**
 * Specialties of the user form; labels are message keys in the UserForm namespace
 */

export const SPECIALTIES = [
	'restorative',
	'endodontics',
	'prosthodontics',
	'surgery',
	'implantology',
	'orthodontics',
	'periodontics',
	'pediatric',
] as const

/**
 * Dentists an assistant can be attached to: the chief and the doctors
 */

export const ASSISTANT_DOCTORS = USERS.filter(
	user => user.type === 'chief' || user.type === 'doctor',
).map(user => ({ id: user.id, name: getShortName(user.fullName) }))
