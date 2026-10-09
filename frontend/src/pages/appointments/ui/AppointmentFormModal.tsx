'use client'

import { Ban, CalendarPlus, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/shared/ui/button'
import { Modal } from '@/shared/ui/modal'
import { Spinner } from '@/shared/ui/spinner'

import type { TAppointmentFormModel } from '../model/useAppointmentForm'
import { AppointmentFields } from './AppointmentFields'
import { AppointmentPatientPicker } from './AppointmentPatientPicker'
import { AppointmentSummary } from './AppointmentSummary'

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
		<Modal
			open={form.open}
			onClose={form.close}
			busy={form.saving}
			wide
			icon={<CalendarPlus size={20} aria-hidden='true' />}
			title={form.title}
			subtitle={form.subtitle}
			footer={
				<>
					{form.isEdit && (
						<>
							<Button variant='dangerGhost' onClick={onDelete}>
								<Trash2 size={16} aria-hidden='true' />
								{t('deleteAppointment')}
							</Button>
							<Button
								variant='ghost'
								className='text-warning'
								onClick={onCancelVisit}
							>
								<Ban size={16} aria-hidden='true' />
								{t('cancelVisit')}
							</Button>
						</>
					)}
					<span className='flex-1' />
					<Button onClick={form.close}>{tCommon('cancel')}</Button>
					<Button variant='primary' onClick={form.save} aria-busy={form.saving}>
						{form.saving && <Spinner />}
						{form.saving
							? tCommon('saving')
							: form.isEdit
								? tCommon('save')
								: t('createAppointment')}
					</Button>
				</>
			}
		>
			<div className='flex items-start gap-5 max-[900px]:flex-col'>
				<div className='flex min-w-0 flex-1 flex-col gap-4 max-[900px]:w-full'>
					<AppointmentPatientPicker form={form} />
					<AppointmentFields form={form} />
				</div>
				<AppointmentSummary form={form} />
			</div>
		</Modal>
	)
}
