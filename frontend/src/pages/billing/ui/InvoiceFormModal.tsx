'use client'

import { ReceiptText } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { AffixInput } from '@/shared/ui/affix-input'
import { Avatar } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { ChoiceChips } from '@/shared/ui/choice-chips'
import { Field, formGrid2, formGrid3, inputClass } from '@/shared/ui/field'
import { Modal } from '@/shared/ui/modal'
import { Spinner } from '@/shared/ui/spinner'
import { SwitchCard } from '@/shared/ui/switch-card'

import type { TInvoiceFormModel } from '../model/useInvoiceForm'
import { InvoiceItemsTable } from './InvoiceItemsTable'

const totalRow = 'flex justify-between gap-2.5 text-[13.5px]'

type TInvoiceFormModalProps = { form: TInvoiceFormModel }

export function InvoiceFormModal({ form }: TInvoiceFormModalProps) {
	const t = useTranslations('InvoiceForm')
	const tCommon = useTranslations('Common')
	const { totals } = form

	return (
		<Modal
			open={form.open}
			onClose={form.close}
			busy={form.saving}
			wide
			icon={<ReceiptText size={20} aria-hidden='true' />}
			title={form.title}
			subtitle={form.subtitle}
			footer={
				<>
					<span className='flex-1' />
					<Button onClick={form.close}>{tCommon('cancel')}</Button>
					{!form.isEdit && (
						<Button onClick={form.saveOnly}>{t('createInvoice')}</Button>
					)}
					<Button variant='primary' onClick={form.save} aria-busy={form.saving}>
						{form.saving && <Spinner />}
						{form.saving
							? t('creating')
							: form.isEdit
								? tCommon('save')
								: t('createAndCollect')}
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
								{form.patient.meta}
							</div>
						</div>
					</div>
				</Field>
				<Field as='div' label={t('basis')}>
					<ChoiceChips
						aria-label={t('basis')}
						options={[
							{ id: 'plan' as const, label: t('basisPlan') },
							{ id: 'visit' as const, label: t('basisVisit') },
							{ id: 'none' as const, label: t('basisNone') },
						]}
						value={form.basis}
						onChange={form.setBasis}
					/>
				</Field>
				<Field label={t('dueDate')} error={form.errorOf(form.errors.dueDate)}>
					<input
						className={`${inputClass} font-mono`}
						{...form.register('dueDate')}
					/>
				</Field>
			</div>
			<InvoiceItemsTable form={form} />
			<div className='flex flex-wrap items-start gap-4.5'>
				<div className='flex flex-[1_1_300px] flex-col gap-3'>
					<div className={formGrid2}>
						<Field
							label={t('discountPercent')}
							error={form.errorOf(form.errors.discount)}
						>
							<AffixInput
								suffix='%'
								inputMode='numeric'
								{...form.register('discount')}
							/>
						</Field>
						<Field as='div' label={t('foms')}>
							<ChoiceChips
								aria-label={t('foms')}
								options={[
									{ id: 'no' as const, label: t('fomsNo') },
									{ id: 'yes' as const, label: t('fomsApply') },
								]}
								value={form.foms}
								onChange={form.setFoms}
							/>
						</Field>
					</div>
					<SwitchCard
						label={t('sendBySms')}
						hint={t('sendBySmsHint')}
						checked={form.sms}
						onChange={form.setSms}
					/>
				</div>
				<div className='flex w-70 flex-col gap-2 rounded-2xl border border-line bg-raised p-3.5 max-[720px]:w-full'>
					<div className={totalRow}>
						<span className='text-ink-muted'>{t('amount')}</span>
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
				</div>
			</div>
		</Modal>
	)
}
