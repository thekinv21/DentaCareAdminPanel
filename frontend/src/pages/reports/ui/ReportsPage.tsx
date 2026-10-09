import type { Metadata } from 'next'

import { ReportsView } from './ReportsView'

export const metadata: Metadata = { title: 'Отчёты' }

export function ReportsPage() {
	return <ReportsView />
}
