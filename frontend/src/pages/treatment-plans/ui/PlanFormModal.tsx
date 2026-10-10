'use client'

import { ClipboardList, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Controller, FormProvider } from 'react-hook-form'

import { useFieldProps } from '@/shared/lib/form'
import { Avatar } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { ChoiceChips } from '@/shared/ui/choice-chips'
import {
	Field,
	FormField,
	formGrid3,
	inputClass,
	textareaClass,
} from '@/shared/ui/field'
import { Modal } from '@/shared/ui/modal'
import { Spinner } from '@/shared/ui/spinner'

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
					<>
						{form.isEdit && (
							<Button variant='dangerGhost' onClick={form.remove}>
								<Trash2 size={16} aria-hidden='true' />
								{t('deletePlan')}
							</Button>
						)}
						<span className='flex-1' />
						<Button onClick={form.close}>{tCommon('cancel')}</Button>
						<Button onClick={form.saveDraft}>{t('saveDraft')}</Button>
						<Button type='submit' variant='primary' aria-busy={form.saving}>
							{form.saving && <Spinner />}
							{form.saving
								? tCommon('saving')
								: form.isEdit
									? tCommon('save')
									: t('sendForApproval')}
						</Button>
					</>
				}
			>
				<div className={formGrid3}>
					<Field as='div' label={t('patient')} required>
						<div className='flex items-center gap-3 rounded-[14px] border-[1.5px] border-brand bg-brand-soft px-2.5 py-2'>
							<Avatar initials={form.patient.initials} size={32} />
							<div className='min-w-0 flex-1'>
								<div className='truncate font-bold'>{form.patient.name}</div>
								<div className='font-mono text-[11.5px] text-ink-muted'>
									{form.patient.id}
								</div>
							</div>
						</div>
					</Field>
					<Field as='div' label={t('doctor')} required>
						<Controller
							control={control}
							name='doctor'
							render={({ field }) => (
								<ChoiceChips
									aria-label={t('doctor')}
									options={form.doctorOptions}
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>
					</Field>
					<PlanNameField />
				</div>
				<PlanStagesTable />
				<div className='flex flex-wrap items-start gap-4.5'>
					<div className='flex flex-[1_1_320px] flex-col gap-3'>
						<Field as='div' label={t('payment')}>
							<Controller
								control={control}
								name='payment'
								render={({ field }) => (
									<ChoiceChips
										aria-label={t('payment')}
										options={PLAN_PAYMENTS.map(id => ({
											id,
											label: t(PAYMENT_LABEL[id]),
										}))}
										value={field.value}
										onChange={field.onChange}
									/>
								)}
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
