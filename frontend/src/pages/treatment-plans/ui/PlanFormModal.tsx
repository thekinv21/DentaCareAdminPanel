'use client'

import { ClipboardList } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FormProvider } from 'react-hook-form'

import { useFieldProps } from '@/shared/lib/form'
import { Avatar } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { ChoiceChipsField } from '@/shared/ui/choice-chips'
import {
	Field,
	FormField,
	formGrid3,
	inputClass,
	textareaClass,
} from '@/shared/ui/field'
import { Modal, ModalDeleteButton, ModalFooter } from '@/shared/ui/modal'
import { SubjectTile } from '@/shared/ui/subject-tile'

import { PLAN_PAYMENTS, type TPlanFormInput } from '../model/PlanFormSchema'
import type { TPlanFormModel } from '../model/usePlanForm'
import { PlanStagesTable } from './PlanStagesTable'
import { PlanTotalsCard } from './PlanTotalsCard'

const PAYMENT_LABEL = {
	full: 'payFull',
	stage: 'payByStage',
	inst: 'payInstallment',
} as const

type TPlanFormModalProps = { form: TPlanFormModel }

export function PlanFormModal({ form }: TPlanFormModalProps) {
	const t = useTranslations('PlanForm')
	const tCommon = useTranslations('Common')
	const { control } = form.methods

	return (
		<FormProvider {...form.methods}>
			<Modal
				open={form.open}
				onClose={form.close}
				onSubmit={form.submit}
				busy={form.saving}
				wide
				icon={<ClipboardList size={20} aria-hidden='true' />}
				title={form.title}
				subtitle={form.subtitle}
				footer={
					<ModalFooter
						onCancel={form.close}
						saving={form.saving}
						submitLabel={form.isEdit ? tCommon('save') : t('sendForApproval')}
						leading={
							form.isEdit && (
								<ModalDeleteButton onClick={form.remove}>
									{t('deletePlan')}
								</ModalDeleteButton>
							)
						}
						extra={<Button onClick={form.saveDraft}>{t('saveDraft')}</Button>}
					/>
				}
			>
				<div className={formGrid3}>
					<Field as='div' label={t('patient')} required>
						<SubjectTile
							compact
							media={<Avatar initials={form.patient.initials} size={32} />}
							title={form.patient.name}
							caption={<span className='font-mono'>{form.patient.id}</span>}
						/>
					</Field>
					<Field as='div' label={t('doctor')} required>
						<ChoiceChipsField
							control={control}
							name='doctor'
							aria-label={t('doctor')}
							options={form.doctorOptions}
						/>
					</Field>
					<PlanNameField />
				</div>
				<PlanStagesTable />
				<div className='flex flex-wrap items-start gap-4.5'>
					<div className='flex flex-[1_1_320px] flex-col gap-3'>
						<Field as='div' label={t('payment')}>
							<ChoiceChipsField
								control={control}
								name='payment'
								aria-label={t('payment')}
								options={PLAN_PAYMENTS.map(payment => ({
									id: payment,
									label: t(PAYMENT_LABEL[payment]),
								}))}
							/>
						</Field>
						<Field label={t('noteForPatient')}>
							<textarea
								className={textareaClass}
								placeholder={t('notePlaceholder')}
								{...form.methods.register('note')}
							/>
						</Field>
					</div>
					<PlanTotalsCard />
				</div>
			</Modal>
		</FormProvider>
	)
}

function PlanNameField() {
	const t = useTranslations('PlanForm')
	const inputProps = useFieldProps<TPlanFormInput>()
	return (
		<FormField name='name' label={t('planName')} required>
			<input
				className={inputClass}
				placeholder={t('planNamePlaceholder')}
				{...inputProps('name')}
			/>
		</FormField>
	)
}
