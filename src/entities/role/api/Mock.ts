import type { TPermissionAction, TRole, TSystemRoleId } from '../model/Types'

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
		permissionCount: 37,
		system: true,
		modules: ['allSections'],
		members: [{ initials: 'АК', tone: 'accent' }],
	},
	{
		id: 'chief',
		name: 'chief',
		description: 'chiefDescription',
		color: '#C25E1E',
		users: 1,
		permissionCount: 33,
		system: true,
		modules: ['appointments', 'patients', 'reports', 'users'],
		members: [{ initials: 'АК', tone: 'accent' }],
	},
	{
		id: 'doctor',
		name: 'doctor',
		description: 'doctorDescription',
		color: '#0A7570',
		users: 4,
		permissionCount: 12,
		system: true,
		modules: ['appointments', 'patients', 'chartShort', 'plansShort'],
		members: [
			{ initials: 'СП', tone: 'info' },
			{ initials: 'ЭТ', tone: 'ok' },
			{ initials: 'ДЮ', tone: 'warning' },
		],
	},
	{
		id: 'assistant',
		name: 'assistant',
		description: 'assistantDescription',
		color: '#1D5DA3',
		users: 4,
		permissionCount: 9,
		system: true,
		modules: ['appointments', 'chartShort', 'inventory'],
		members: [
			{ initials: 'БК', tone: 'brand' },
			{ initials: 'ОД', tone: 'info' },
			{ initials: 'ИГ', tone: 'accent' },
		],
	},
	{
		id: 'reception',
		name: 'reception',
		description: 'receptionDescription',
		color: '#5A7175',
		users: 2,
		permissionCount: 14,
		system: false,
		modules: ['appointments', 'patients', 'billing'],
		members: [
			{ initials: 'ЭТ', tone: 'ok' },
			{ initials: 'НБ', tone: 'neutral' },
		],
	},
	{
		id: 'finance',
		name: 'finance',
		description: 'financeDescription',
		color: '#8A5600',
		users: 1,
		permissionCount: 11,
		system: false,
		modules: ['billing', 'reports', 'inventory'],
		members: [{ initials: 'ГО', tone: 'warning' }],
	},
	{
		id: 'store',
		name: 'store',
		description: 'storeDescription',
		color: '#17744A',
		users: 0,
		permissionCount: 6,
		system: false,
		modules: ['inventory'],
		members: [],
	},
]

export const CLINIC_STAFF_COUNT = 13

/**
 * Staff currently assigned to the "Doctor" role (edit screen)
 */
export const DOCTOR_ROLE_MEMBERS = [
	{
		name: 'Сергей Петров',
		sub: 'prosthodonticsAlaToo',
		initials: 'СП',
		tone: 'info',
	},
	{
		name: 'Эрмек Токтогулов',
		sub: 'surgeryAlaToo',
		initials: 'ЭТ',
		tone: 'ok',
	},
	{ name: 'Дария Юсупова', sub: 'hygieneJal', initials: 'ДЮ', tone: 'warning' },
	{
		name: 'Азамат Жээнбеков',
		sub: 'therapyJal',
		initials: 'АЖ',
		tone: 'brand',
	},
] as const

/**
 * What each system role can do, as shown next to the user form.
 * `access` is a message key; `none` means no access
 */
export const ROLE_ACCESS: Record<
	Exclude<TSystemRoleId, 'store'>,
	{ module: string; access: string }[]
> = {
	owner: [{ module: 'allSections', access: 'fullAccess' }],
	chief: [
		{ module: 'appointments', access: 'allActions' },
		{ module: 'patients', access: 'allActions' },
		{ module: 'dentalChart', access: 'editing' },
		{ module: 'billing', access: 'viewRefunds' },
		{ module: 'reports', access: 'all' },
		{ module: 'users', access: 'withoutDeletion' },
	],
	doctor: [
		{ module: 'appointments', access: 'ownViewCreateEdit' },
		{ module: 'patients', access: 'ownViewEdit' },
		{ module: 'dentalChart', access: 'editing' },
		{ module: 'treatmentPlans', access: 'createEdit' },
		{ module: 'billing', access: 'viewing' },
		{ module: 'inventory', access: 'none' },
	],
	assistant: [
		{ module: 'appointments', access: 'assignedDoctorsView' },
		{ module: 'patients', access: 'viewing' },
		{ module: 'dentalChart', access: 'marksWithApproval' },
		{ module: 'inventory', access: 'materialWriteOff' },
		{ module: 'billing', access: 'none' },
	],
	reception: [
		{ module: 'appointments', access: 'allActions' },
		{ module: 'patients', access: 'createEdit' },
		{ module: 'billing', access: 'acceptingPayment' },
		{ module: 'treatmentPlans', access: 'viewing' },
		{ module: 'reports', access: 'none' },
	],
	finance: [
		{ module: 'billing', access: 'viewRefunds' },
		{ module: 'reports', access: 'allExport' },
		{ module: 'inventory', access: 'viewing' },
		{ module: 'appointments', access: 'viewing' },
		{ module: 'patients', access: 'none' },
	],
}

/**
 * Permission matrix of the "Doctor" role (edit screen)
 */
export const DOCTOR_ROLE_PERMISSIONS: Record<string, TPermissionAction[]> = {
	dash: ['view'],
	appt: ['view', 'create', 'edit'],
	pat: ['view', 'edit'],
	chart: ['view', 'edit'],
	plans: ['view', 'create', 'edit'],
	bill: ['view'],
}

export const DOCTOR_ROLE_SCOPE: Record<string, 'all' | 'own'> = {
	appt: 'own',
	pat: 'own',
	plans: 'own',
}
