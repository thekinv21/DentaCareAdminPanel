'use client'

import { Package } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FormProvider } from 'react-hook-form'

import { Modal, ModalDeleteButton, ModalFooter } from '@/shared/ui/modal'
import { SwitchCardField } from '@/shared/ui/switch-card'

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
					<ModalFooter
						onCancel={form.close}
						saving={form.saving}
						submitLabel={form.isEdit ? tCommon('save') : t('addToStock')}
						leading={
							form.isEdit && (
								<ModalDeleteButton onClick={form.remove}>
									{t('delete')}
								</ModalDeleteButton>
							)
						}
					/>
				}
			>
				<StockItemBasics />
				<StockItemDetails />
				<SwitchCardField
					control={control}
					name='autoWriteOff'
					label={t('autoWriteOff')}
					hint={t('autoWriteOffHint')}
				/>
			</Modal>
		</FormProvider>
	)
}
