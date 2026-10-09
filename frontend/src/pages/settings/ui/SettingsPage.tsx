import type { Metadata } from 'next'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { SettingsView } from './SettingsView'

export const metadata: Metadata = { title: 'Настройки' }

export function SettingsPage() {
	return (
		<>
			<PageHeader crumb='Клиника · Бишкек, Ала-Тоо' title='Настройки' />
			<PageContent>
				<SettingsView />
			</PageContent>
		</>
	)
}
