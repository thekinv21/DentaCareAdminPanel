'use client'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { PATIENTS_TOTAL } from '@/entities/patient'

import { useFormat } from '@/shared/lib/i18n'
import { Button } from '@/shared/ui/button'

import { NEW_PATIENTS_THIS_MONTH } from '../model/PatientsQuery'
import { usePatientForm } from '../model/usePatientForm'
import { usePatientRemoval } from '../model/usePatientRemoval'
import { usePatientsTable } from '../model/usePatientsTable'
import { PatientFormModal } from './PatientFormModal'
import { PatientsTable } from './PatientsTable'

export function PatientsPage() {
	const t = useTranslations('Patients')
	const format = useFormat()
	const removal = usePatientRemoval()
	const form = usePatientForm(removal.remove)

	const table = usePatientsTable({
		removedIds: removal.removedIds,
		onEdit: form.openEdit,
		onRemove: removal.remove,
		onBulkRemove: removal.bulkRemove,
	})

	return (
		<>
			<PageHeader
				crumb={t('pageCrumb', {
					total: format.number(PATIENTS_TOTAL),
					newCount: NEW_PATIENTS_THIS_MONTH,
				})}
				title={t('patients')}
				actions={
					<Button variant='primary' onClick={form.openCreate}>
						<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
						{t('newPatient')}
					</Button>
				}
			/>
			<PageContent>
				<PatientsTable table={table} />
			</PageContent>
			<PatientFormModal form={form} />
		</>
	)
}
