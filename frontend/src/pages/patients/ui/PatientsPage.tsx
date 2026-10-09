'use client'

import { Plus } from 'lucide-react'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { useI18n } from '@/shared/lib/i18n'
import { Button } from '@/shared/ui/button'

import { PatientsTable } from './PatientsTable'

export function PatientsPage() {
	const { t } = useI18n()
	return (
		<>
			<PageHeader
				crumb={t('1 284 карты · 46 новых в октябре')}
				title={t('Пациенты')}
				actions={
					<Button variant='primary'>
						<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
						{t('Новый пациент')}
					</Button>
				}
			/>
			<PageContent>
				<PatientsTable />
			</PageContent>
		</>
	)
}
