'use client'

import { ClipboardList, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { Avatar } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { ChoiceChips } from '@/shared/ui/choice-chips'
import { Field, formGrid3, inputClass, textareaClass } from '@/shared/ui/field'
import { Modal } from '@/shared/ui/modal'
import { Spinner } from '@/shared/ui/spinner'

import type { TPlanFormModel } from '../model/usePlanForm'
import { PlanStagesTable } from './PlanStagesTable'

const totalRow = 'flex justify-between gap-2.5 text-[13.5px]'

type TPlanFormModalProps = { form: TPlanFormModel }

export function PlanFormModal({ form }: TPlanFormModalProps) {
	const t = useTranslations('PlanForm')
	const tCommon = useTranslations('Common')
	const { totals } = form

	return (
		<Modal
			open={form.open}
			onClose={form.close}
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
					<Button variant='primary' onClick={form.save} aria-busy={form.saving}>
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
					<ChoiceChips
						aria-label={t('doctor')}
						options={form.doctorOptions}
						value={form.doctor}
						onChange={form.setDoctor}
					/>
				</Field>
				<Field
					label={t('planName')}
					required
					error={form.errorOf(form.nameError)}
				>
					<input
						className={inputClass}
						placeholder={t('planNamePlaceholder')}
						{...form.register('name')}
					/>
				</Field>
			</div>
			<PlanStagesTable form={form} />
			<div className='flex flex-wrap items-start gap-4.5'>
				<div className='flex flex-[1_1_320px] flex-col gap-3'>
					<Field as='div' label={t('payment')}>
						<ChoiceChips
							aria-label={t('payment')}
							options={[
								{ id: 'full' as const, label: t('payFull') },
								{ id: 'stage' as const, label: t('payByStage') },
								{ id: 'inst' as const, label: t('payInstallment') },
							]}
							value={form.payment}
							onChange={form.setPayment}
						/>
					</Field>
					<Field label={t('noteForPatient')}>
						<textarea
							className={textareaClass}
							placeholder={t('notePlaceholder')}
							{...form.register('note')}
						/>
					</Field>
				</div>
				<div className='flex w-75 flex-col gap-2 rounded-2xl border border-line bg-raised p-3.5 max-[720px]:w-full'>
					<div className={totalRow}>
						<span className='text-ink-muted'>{t('total')}</span>
						<span className='font-mono'>{totals.sum}</span>
					</div>
					<div className={totalRow}>
						<span className='text-ink-muted'>{t('discount')}</span>
						<span className='font-mono'>{totals.discount}</span>
					</div>
					<div className={cn(totalRow, 'text-info')}>
						<span>{t('foms')}</span>
						<span className='font-mono'>{totals.foms}</span>
					</div>
					<div
						className={cn(
							totalRow,
							'border-t border-line pt-2 text-base font-extrabold',
						)}
					>
						<span>{t('toPay')}</span>
						<span className='font-mono'>{totals.total}</span>
					</div>
					{totals.installment && (
						<div className='text-[12.5px] text-ink-muted'>
							{totals.installment}
						</div>
					)}
				</div>
			</div>
		</Modal>
	)
}
