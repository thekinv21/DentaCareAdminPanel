export const ROUTES = {
	dashboard: '/',
	users: '/users',
	userNew: '/users/new',
	user: (id: string) => `/users/${id}`,
	roles: '/roles',
	roleNew: '/roles/new',
	role: (id: string) => `/roles/${id}`,
	profile: '/profile',

	login: '/login',
	register: '/register',
	forgotPassword: '/forgot-password',
	verify: '/verify',
	resetPassword: '/reset-password',
} as const
