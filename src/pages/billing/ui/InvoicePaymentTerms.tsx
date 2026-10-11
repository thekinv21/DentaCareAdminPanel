'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/shared/lib/cn'
import { useFieldProps } from '@/shared/lib/form'
import { AffixInput } from '@/shared/ui/affix-input'
import { ChoiceChipsField } from '@/shared/ui/choice-chips'
import { Field, FormField, formGrid2 } from '@/shared/ui/field'
import { SwitchCardField } from '@/shared/ui/switch-card'

import {
	FOMS_OPTIONS,
	type TInvoiceFormInput,
} from '../model/InvoiceFormSchema'
import { useInvoiceTotals } from '../model/useInvoiceTotals'

const FOMS_LABEL = { no: 'fomsNo', yes: 'fomsApply' } as const
const totalRow = 'flex justify-between gap-2.5 text-[13.5px]'

/**
 * Discount, ФОМС, SMS delivery and the totals box of the invoice form
 */
export function InvoicePaymentTerms() {
	const t = useTranslations('InvoiceForm')
	const { control } = useFormContext<TInvoiceFormInput>()
	const inputProps = useFieldProps<TInvoiceFormInput>()
	const totals = useInvoiceTotals()

	return (
		<div className='flex flex-wrap items-start gap-4.5'>
			<div className='flex flex-[1_1_300px] flex-col gap-3'>
				<div className={formGrid2}>
					<FormField name='discount' label={t('discountPercent')}>
						<AffixInput
							suffix='%'
							inputMode='numeric'
							{...inputProps('discount')}
						/>
					</FormField>
					<Field as='div' label={t('foms')}>
						<ChoiceChipsField
							control={control}
							name='foms'
							aria-label={t('foms')}
							options={FOMS_OPTIONS.map(fomsOption => ({
								id: fomsOption,
								label: t(FOMS_LABEL[fomsOption]),
							}))}
						/>
					</Field>
				</div>
				<SwitchCardField
					control={control}
					name='sms'
					label={t('sendBySms')}
					hint={t('sendBySmsHint')}
				/>
			</div>
			<div className='flex w-70 flex-col gap-2 rounded-2xl border border-line bg-raised p-3.5 max-mobile:w-full'>
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
	)
}
