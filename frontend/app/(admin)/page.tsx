import { redirect } from 'next/navigation'

import { ROUTES } from '@/shared/routes'

export default function AdminIndexPage() {
	redirect(ROUTES.users)
}
