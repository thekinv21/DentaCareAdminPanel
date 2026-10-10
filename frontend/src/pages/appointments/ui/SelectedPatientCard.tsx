'use client'

import { TriangleAlert } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Avatar } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { SubjectTile } from '@/shared/ui/subject-tile'

import type { TAppointmentFormModel } from '../model/useAppointmentForm'

type TSelectedPatientCardProps = {
	patient: NonNullable<TAppointmentFormModel['patient']>
	onChange: () => void
}

export function SelectedPatientCard({
	patient,
	onChange,
}: TSelectedPatientCardProps) {
	const t = useTranslations('AppointmentForm')

	return (
		<SubjectTile
			media={
				<Avatar initials={patient.initials} tone={patient.tone} size={40} />
			}
			title={
				<span className='inline-flex flex-wrap items-center gap-2'>
					{patient.name}
					{patient.hasAllergy && (
						<Badge tone='danger'>
							<TriangleAlert size={12} aria-hidden='true' />
							{t('allergy')}
						</Badge>
					)}
				</span>
			}
			caption={
				patient.id && (
					<>
						<span className='font-mono'>{patient.id}</span> · {patient.phone}
					</>
				)
			}
			action={
				<Button size='sm' onClick={onChange}>
					{t('change')}
				</Button>
			}
		/>
	)
}
