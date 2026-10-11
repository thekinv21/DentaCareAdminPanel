'use client'

import { CalendarClock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FormProvider } from 'react-hook-form'

import { Alert } from '@/shared/ui/alert'
import { Avatar } from '@/shared/ui/avatar'
import { ChoiceChipsField } from '@/shared/ui/choice-chips'
import { Field } from '@/shared/ui/field'
import { Modal, ModalDeleteButton, ModalFooter } from '@/shared/ui/modal'
import { SubjectTile } from '@/shared/ui/subject-tile'

import { SHIFT_REPEATS, SHIFT_TYPES } from '../model/ShiftFormSchema'
import type { TShiftFormModel } from '../model/useShiftForm'
import { ShiftTimeFields } from './ShiftTimeFields'

type TShiftModalProps = { shiftForm: TShiftFormModel }

export function ShiftModal({ shiftForm }: TShiftModalProps) {
	const t = useTranslations('ShiftForm')
	const { control } = shiftForm.methods
	const { target } = shiftForm

	return (
		<FormProvider {...shiftForm.methods}>
			<Modal
				open={shiftForm.isOpen}
				onClose={shiftForm.close}
				onSubmit={shiftForm.submit}
				busy={shiftForm.saving}
				icon={<CalendarClock size={20} aria-hidden='true' />}
				title={t('shift')}
				subtitle={t('subtitle')}
				footer={
					<ModalFooter
						onCancel={shiftForm.close}
						saving={shiftForm.saving}
						submitLabel={t('saveShift')}
						leading={
							<ModalDeleteButton onClick={shiftForm.remove}>
								{t('deleteShift')}
							</ModalDeleteButton>
						}
					/>
				}
			>
				{target && (
					<SubjectTile
						media={
							<Avatar initials={target.initials} tone={target.tone} size={40} />
						}
						title={target.name}
						caption={shiftForm.day}
					/>
				)}
				<Field as='div' label={t('type')}>
					<ChoiceChipsField
						control={control}
						name='type'
						aria-label={t('type')}
						options={SHIFT_TYPES.map(shiftType => ({
							id: shiftType,
							label: t(`type_${shiftType}`),
						}))}
					/>
				</Field>
				{shiftForm.isWork && <ShiftTimeFields />}
				<Field as='div' label={t('repeat')}>
					<ChoiceChipsField
						control={control}
						name='repeat'
						aria-label={t('repeat')}
						options={SHIFT_REPEATS.map(repeat => ({
							id: repeat,
							label: t(`repeat_${repeat}`),
						}))}
					/>
				</Field>
				{shiftForm.conflict && (
					<Alert tone='warning' size='sm'>
						{shiftForm.conflict}
					</Alert>
				)}
			</Modal>
		</FormProvider>
	)
}
