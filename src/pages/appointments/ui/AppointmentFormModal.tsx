'use client'

import { Ban, CalendarPlus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FormProvider } from 'react-hook-form'

import { Button } from '@/shared/ui/button'
import { Modal, ModalDeleteButton, ModalFooter } from '@/shared/ui/modal'

import type { TAppointmentFormModel } from '../model/useAppointmentForm'
import { AppointmentDetailFields } from './AppointmentDetailFields'
import { AppointmentPatientPicker } from './AppointmentPatientPicker'
import { AppointmentSummary } from './AppointmentSummary'
import { AppointmentTimeFields } from './AppointmentTimeFields'

type TAppointmentFormModalProps = {
	form: TAppointmentFormModel
	onDelete: () => void
	onCancelVisit: () => void
}

export function AppointmentFormModal(props: TAppointmentFormModalProps) {
	const { form, onDelete, onCancelVisit } = props

	const t = useTranslations('AppointmentForm')
	const tCommon = useTranslations('Common')

	return (
		<FormProvider {...form.methods}>
			<Modal
				open={form.open}
				onClose={form.close}
				onSubmit={form.submit}
				busy={form.saving}
				wide
				icon={<CalendarPlus size={20} aria-hidden='true' />}
				title={form.title}
				subtitle={form.subtitle}
				footer={
					<ModalFooter
						onCancel={form.close}
						saving={form.saving}
						submitLabel={form.isEdit ? tCommon('save') : t('createAppointment')}
						leading={
							form.isEdit && (
								<>
									<ModalDeleteButton onClick={onDelete}>
										{t('deleteAppointment')}
									</ModalDeleteButton>
									<Button
										variant='ghost'
										className='text-warning'
										onClick={onCancelVisit}
									>
										<Ban size={16} aria-hidden='true' />
										{t('cancelVisit')}
									</Button>
								</>
							)
						}
					/>
				}
			>
				<div className='flex items-start gap-5 max-tablet:flex-col'>
					<div className='flex min-w-0 flex-1 flex-col gap-4 max-tablet:w-full'>
						<AppointmentPatientPicker patient={form.patient} />
						<AppointmentTimeFields
							eventKey={form.item?.key}
							removedKeys={form.removedKeys}
						/>
						<AppointmentDetailFields isEdit={form.isEdit} />
					</div>
					<AppointmentSummary
						patientName={form.patient?.name}
						isEdit={form.isEdit}
					/>
				</div>
			</Modal>
		</FormProvider>
	)
}
