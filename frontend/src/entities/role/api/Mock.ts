import { ALL_PERMISSIONS, expandPermissions } from '../model/Permissions'
import type { TRole, TRoleOption } from '../model/Types'

/**
 * Mock roles until the backend exposes /roles
 */
export const ROLES: TRole[] = [
	{
		id: 'owner',
		name: 'owner',
		description: 'ownerDescription',
		color: '#AD3D17',
		users: 1,
		system: true,
		permissions: ALL_PERMISSIONS,
	},
	{
		id: 'chief',
		name: 'chief',
		description: 'chiefDescription',
		color: '#C25E1E',
		users: 1,
		system: true,
		permissions: expandPermissions({
			dash: 'v',
			appt: 'vced',
			pat: 'vced',
			chart: 've',
			plans: 'vced',
			bill: 'vce',
			inv: 'vce',
			rep: 'v',
			staff: 'vce',
			users: 'vce',
			roles: 'v',
			set: 'v',
		}),
	},
	{
		id: 'doctor',
		name: 'doctor',
		description: 'doctorDescription',
		color: '#0A7570',
		users: 4,
		system: true,
		permissions: expandPermissions({
			dash: 'v',
			appt: 'vce',
			pat: 've',
			chart: 've',
			plans: 'vce',
			bill: 'v',
		}),
	},
	{
		id: 'assistant',
		name: 'assistant',
		description: 'assistantDescription',
		color: '#1D5DA3',
		users: 4,
		system: true,
		permissions: expandPermissions({
			dash: 'v',
			appt: 'v',
			pat: 'v',
			chart: 've',
			inv: 'vce',
		}),
	},
	{
		id: 'reception',
		name: 'reception',
		description: 'receptionDescription',
		color: '#5A7175',
		users: 2,
		system: false,
		permissions: expandPermissions({
			dash: 'v',
			appt: 'vced',
			pat: 'vce',
			plans: 'v',
			bill: 'vc',
		}),
	},
	{
		id: 'finance',
		name: 'finance',
		description: 'financeDescription',
		color: '#8A5600',
		users: 1,
		system: false,
		permissions: expandPermissions({
			dash: 'v',
			bill: 'vced',
			rep: 'v',
			inv: 'v',
		}),
	},
	{
		id: 'store',
		name: 'store',
		description: 'storeDescription',
		color: '#17744A',
		users: 0,
		system: false,
		permissions: expandPermissions({ inv: 'vced' }),
	},
]

/**
 * Mock role choices until the backend sends them
 */
export const ROLE_OPTIONS: TRoleOption[] = [
	{ id: 'owner', label: 'Владелец' },
	{ id: 'chief', label: 'Главный врач' },
	{ id: 'doctor', label: 'Врач' },
	{ id: 'assistant', label: 'Ассистент' },
	{ id: 'reception', label: 'Ресепшен' },
	{ id: 'finance', label: 'Финансы' },
	{ id: 'store', label: 'Кладовщик' },
]
