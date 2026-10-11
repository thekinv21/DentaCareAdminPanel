import type { TUser } from '@/entities/user'
import { USER_TYPE } from '@/entities/user'

import type { TUserFormValues } from './UserFormSchema'

export const EMPTY_USER_VALUES: TUserFormValues = {
	type: 'doctor',
	role: USER_TYPE.doctor.role,
	lastName: '',
	firstName: '',
	phone: '',
	email: '',
	branch: 'alaToo',
	specialties: [],
	license: '',
	doctors: [],
	active: true,
}

/**
 * Mock profile details the list doesn't carry (until GET /users/:id exists)
 */

export function toFormValues(user: TUser): TUserFormValues {
	const [firstName, lastName = ''] = user.fullName.split(' ')

	return {
		...EMPTY_USER_VALUES,
		type: user.type,
		role: user.role,
		lastName,
		firstName,
		phone: user.phone.replace('+996 ', ''),
		email: user.email,
		branch: user.branch,
		specialties: ['prosthodontics'],
		license: 'СТ-0457',
		doctors: ['u2'],
		active: user.active,
	}
}
