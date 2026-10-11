import type {
	TPermissionAction,
	TPermissionModule,
	TPermissions,
} from './Types'

export const PERMISSION_ACTIONS: { id: TPermissionAction; label: string }[] = [
	{ id: 'view', label: 'view' },
	{ id: 'create', label: 'create' },
	{ id: 'edit', label: 'edit' },
	{ id: 'delete', label: 'delete' },
]

export const PERMISSION_MODULES: TPermissionModule[] = [
	{
		id: 'dash',
		name: 'dashboard',
		hint: 'dailySummaryAndKpi',
		actions: ['view'],
	},
	{
		id: 'appt',
		name: 'appointments',
		hint: 'scheduleAndVisits',
		actions: ['view', 'create', 'edit', 'delete'],
	},
	{
		id: 'pat',
		name: 'patients',
		hint: 'recordsAndContacts',
		actions: ['view', 'create', 'edit', 'delete'],
	},
	{
		id: 'chart',
		name: 'dentalChart',
		hint: 'toothMarks',
		actions: ['view', 'edit'],
	},
	{
		id: 'plans',
		name: 'treatmentPlans',
		hint: 'approvalAndCost',
		actions: ['view', 'create', 'edit', 'delete'],
	},
	{
		id: 'bill',
		name: 'billing',
		hint: 'invoicesRefundsTills',
		actions: ['view', 'create', 'edit', 'delete'],
	},
	{
		id: 'inv',
		name: 'inventory',
		hint: 'stockInOut',
		actions: ['view', 'create', 'edit', 'delete'],
	},
	{
		id: 'rep',
		name: 'reports',
		hint: 'revenueDoctorsExport',
		actions: ['view'],
	},
	{
		id: 'staff',
		name: 'staffAndShifts',
		hint: 'workSchedule',
		actions: ['view', 'create', 'edit'],
	},
	{
		id: 'users',
		name: 'users',
		hint: 'accounts',
		actions: ['view', 'create', 'edit', 'delete'],
	},
	{
		id: 'roles',
		name: 'rolesAndAccess',
		hint: 'staffPermissions',
		actions: ['view', 'create', 'edit', 'delete'],
	},
	{
		id: 'set',
		name: 'settings',
		hint: 'clinicPricesBanks',
		actions: ['view', 'edit'],
	},
]

export const PERMISSIONS_TOTAL = PERMISSION_MODULES.reduce(
	(sum, permissionModule) => sum + permissionModule.actions.length,
	0,
)

const ACTION_BY_LETTER: Record<string, TPermissionAction> = {
	v: 'view',
	c: 'create',
	e: 'edit',
	d: 'delete',
}

/**
 * `{ appt: 'vce' }` → `{ appt: ['view', 'create', 'edit'] }`
 */
export const expandPermissions = (
	shortCodes: Record<string, string>,
): TPermissions =>
	Object.fromEntries(
		Object.entries(shortCodes).map(([moduleId, letters]) => [
			moduleId,
			letters.split('').map(letter => ACTION_BY_LETTER[letter]),
		]),
	)

/**
 * Every action of every module
 */
export const ALL_PERMISSIONS: TPermissions = Object.fromEntries(
	PERMISSION_MODULES.map(permissionModule => [
		permissionModule.id,
		permissionModule.actions,
	]),
)

/**
 * Number of module actions switched on
 */
export const countGranted = (permissions: TPermissions) =>
	PERMISSION_MODULES.reduce(
		(total, permissionModule) =>
			total +
			permissionModule.actions.filter(action =>
				permissions[permissionModule.id]?.includes(action),
			).length,
		0,
	)
