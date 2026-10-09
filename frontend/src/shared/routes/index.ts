export const ROUTES = {
	dashboard: '/',
	patients: '/patients',
	patient: (id: string) => `/patients/${id}`,
	appointments: '/appointments',
	treatmentPlans: '/treatment-plans',
	billing: '/billing',
	inventory: '/inventory',
	reports: '/reports',
	staff: '/staff',
	settings: '/settings',
	profile: '/profile',

	login: '/login',
	register: '/register',
	forgotPassword: '/forgot-password',
	verify: '/verify',
	resetPassword: '/reset-password',
} as const
