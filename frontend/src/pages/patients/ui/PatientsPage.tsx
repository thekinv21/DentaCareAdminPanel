import type { Metadata } from 'next'

import { Plus } from 'lucide-react'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { Button } from '@/shared/ui/button'

import { PatientsTable } from './PatientsTable'

export const metadata: Metadata = { title: 'Пациенты' }

export function PatientsPage() {
	return (
		<>
			<PageHeader
				crumb='1 284 карты · 46 новых в октябре'
				title='Пациенты'
				actions={
					<Button variant='primary'>
						<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
						Новый пациент
					</Button>
				}
			/>
			<PageContent>
				<PatientsTable />
			</PageContent>
		</>
	)
}
