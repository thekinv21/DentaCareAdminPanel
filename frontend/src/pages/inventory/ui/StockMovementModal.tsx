'use client'

import { ArrowLeftRight, Package } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FormProvider } from 'react-hook-form'

import { Alert } from '@/shared/ui/alert'
import { Button } from '@/shared/ui/button'
import { ChoiceChips } from '@/shared/ui/choice-chips'
import { Field, FormField, formGrid2, inputClass } from '@/shared/ui/field'
import { Modal } from '@/shared/ui/modal'
import { Spinner } from '@/shared/ui/spinner'

import { MOVEMENT_TYPES } from '../model/StockFormSchema'
import type { TStockMovementModel } from '../model/useStockMovement'

type TStockMovementModalProps = { movement: TStockMovementModel }

export function StockMovementModal({ movement }: TStockMovementModalProps) {
	const t = useTranslations('StockForm')
	const tCommon = useTranslations('Common')
	const { register, formState } = movement.methods

	return (
		<FormProvider {...movement.methods}>
			<Modal
				open={movement.open}
				onClose={movement.close}
				onSubmit={movement.submit}
				busy={movement.saving}
				icon={<ArrowLeftRight size={20} aria-hidden='true' />}
				title={t('movementTitle')}
				subtitle={t('movementSubtitle')}
				footer={
					<>
						<span className='flex-1' />
						<Button onClick={movement.close}>{tCommon('cancel')}</Button>
						<Button type='submit' variant='primary' aria-busy={movement.saving}>
							{movement.saving && <Spinner />}
							{movement.saving ? t('posting') : t('post')}
						</Button>
					</>
				}
			>
				<div className='flex items-center gap-3 rounded-[14px] border-[1.5px] border-brand bg-brand-soft px-3 py-2.5'>
					<span className='inline-flex size-9.5 items-center justify-center rounded-xl bg-surface text-brand-strong'>
						<Package size={18} aria-hidden='true' />
					</span>
					<div className='min-w-0 flex-1'>
						<div className='font-bold'>{movement.name}</div>
						<div className='text-[12.5px] text-ink-muted'>
							{movement.stockLine}
						</div>
					</div>
				</div>
				<Field as='div' label={t('operation')}>
					<ChoiceChips
						aria-label={t('operation')}
						options={MOVEMENT_TYPES.map(id => ({
							id,
							label: t(`movement_${id}`),
						}))}
						value={movement.type}
						onChange={movement.changeType}
					/>
				</Field>
				<div className={formGrid2}>
					<FormField name='quantity' label={t('quantity')} required>
						<input
							inputMode='numeric'
							className={`${inputClass} font-mono`}
							aria-invalid={!!formState.errors.quantity}
							{...register('quantity')}
						/>
					</FormField>
					<Field label={t('date')}>
						<input
							className={`${inputClass} font-mono`}
							{...register('date')}
						/>
					</Field>
					<Field label={movement.reasonLabel} className='col-span-full'>
						<input className={inputClass} {...register('reason')} />
					</Field>
				</div>
				<Alert tone='info' className='text-[13px] leading-4.75'>
					{t('stockAfter')} <b className='font-mono'>{movement.after}</b>
				</Alert>
			</Modal>
		</FormProvider>
	)
}
