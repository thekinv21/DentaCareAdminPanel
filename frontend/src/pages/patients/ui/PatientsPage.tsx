'use client'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { Button } from '@/shared/ui/button'

import { PatientsTable } from './PatientsTable'

export function PatientsPage() {
	const t = useTranslations('Patients')
	return (
		<>
			<PageHeader
				crumb={t('n1284Records46')}
				title={t('patients')}
				actions={
					<Button variant='primary'>
						<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
						{t('newPatient')}
					</Button>
				}
			/>
			<PageContent>
				<PatientsTable />
			</PageContent>
		</>
	)
}
