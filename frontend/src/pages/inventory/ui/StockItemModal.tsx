'use client'

import { Package, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Controller, FormProvider } from 'react-hook-form'

import { Button } from '@/shared/ui/button'
import { Modal } from '@/shared/ui/modal'
import { Spinner } from '@/shared/ui/spinner'
import { SwitchCard } from '@/shared/ui/switch-card'

import type { TStockItemFormModel } from '../model/useStockItemForm'
import { StockItemBasics } from './StockItemBasics'
import { StockItemDetails } from './StockItemDetails'

type TStockItemModalProps = { form: TStockItemFormModel }

export function StockItemModal({ form }: TStockItemModalProps) {
	const t = useTranslations('StockForm')
	const tCommon = useTranslations('Common')
	const { control } = form.methods

	return (
		<FormProvider {...form.methods}>
			<Modal
				open={form.open}
				onClose={form.close}
				onSubmit={form.submit}
				busy={form.saving}
				icon={<Package size={20} aria-hidden='true' />}
				title={form.title}
				subtitle={form.subtitle}
				footer={
					<>
						{form.isEdit && (
							<Button variant='dangerGhost' onClick={form.remove}>
								<Trash2 size={16} aria-hidden='true' />
								{t('delete')}
							</Button>
						)}
						<span className='flex-1' />
						<Button onClick={form.close}>{tCommon('cancel')}</Button>
						<Button type='submit' variant='primary' aria-busy={form.saving}>
							{form.saving && <Spinner />}
							{form.saving
								? tCommon('saving')
								: form.isEdit
									? tCommon('save')
									: t('addToStock')}
						</Button>
					</>
				}
			>
				<StockItemBasics />
				<StockItemDetails />
				<Controller
					control={control}
					name='autoWriteOff'
					render={({ field }) => (
						<SwitchCard
							label={t('autoWriteOff')}
							hint={t('autoWriteOffHint')}
							checked={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</Modal>
		</FormProvider>
	)
}
