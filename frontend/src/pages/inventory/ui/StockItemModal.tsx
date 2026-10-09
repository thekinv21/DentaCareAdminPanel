'use client'

import { Package, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/shared/ui/button'
import { ChoiceChips } from '@/shared/ui/choice-chips'
import { Field, formGrid2, formGrid3, inputClass } from '@/shared/ui/field'
import { Modal } from '@/shared/ui/modal'
import { Spinner } from '@/shared/ui/spinner'
import { SwitchCard } from '@/shared/ui/switch-card'

import {
	STOCK_CATEGORIES,
	STOCK_UNITS,
	SUPPLIERS,
} from '../model/StockFormSchema'
import type { TStockItemFormModel } from '../model/useStockItemForm'

type TStockItemModalProps = { form: TStockItemFormModel }

export function StockItemModal({ form }: TStockItemModalProps) {
	const t = useTranslations('StockForm')
	const tInventory = useTranslations('Inventory')
	const tCommon = useTranslations('Common')

	return (
		<Modal
			open={form.open}
			onClose={form.close}
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
					<Button variant='primary' onClick={form.save} aria-busy={form.saving}>
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
			<div className={formGrid2}>
				<Field
					label={t('name')}
					required
					error={form.errorOf('name')}
					className='col-span-full'
				>
					<input
						className={inputClass}
						placeholder={t('namePlaceholder')}
						{...form.field('name')}
					/>
				</Field>
				<Field label={t('sku')}>
					<input
						className={`${inputClass} font-mono`}
						placeholder='ANS-0000'
						{...form.field('sku')}
					/>
				</Field>
				<Field as='div' label={t('unit')}>
					<ChoiceChips
						aria-label={t('unit')}
						options={STOCK_UNITS.map(id => ({ id, label: t(`unit_${id}`) }))}
						value={form.values.unit ?? 'pcs'}
						onChange={form.setUnit}
					/>
				</Field>
				<Field
					as='div'
					label={t('category')}
					required
					className='col-span-full'
				>
					<ChoiceChips
						aria-label={t('category')}
						options={STOCK_CATEGORIES.map(id => ({
							id,
							label: t(`category_${id}`),
						}))}
						value={form.values.category ?? 'cons'}
						onChange={form.setCategory}
					/>
				</Field>
			</div>
			<div className={formGrid3}>
				<Field label={t('currentStock')} error={form.errorOf('quantity')}>
					<input
						inputMode='numeric'
						className={`${inputClass} font-mono`}
						{...form.field('quantity')}
					/>
				</Field>
				<Field
					label={t('minimumStock')}
					required
					hint={t('minimumHint')}
					error={form.errorOf('minimum')}
				>
					<input
						inputMode='numeric'
						className={`${inputClass} font-mono`}
						{...form.field('minimum')}
					/>
				</Field>
				<Field label={t('purchasePrice')}>
					<input
						inputMode='numeric'
						className={`${inputClass} font-mono`}
						{...form.field('cost')}
					/>
				</Field>
				<Field label={t('supplier')}>
					<select className={inputClass} {...form.field('supplier')}>
						{SUPPLIERS.map(id => (
							<option key={id} value={id}>
								{tInventory(id)}
							</option>
						))}
					</select>
				</Field>
				<Field label={t('expiryDate')}>
					<input
						className={`${inputClass} font-mono`}
						placeholder={t('expiryPlaceholder')}
						{...form.field('expires')}
					/>
				</Field>
				<Field label={t('storagePlace')}>
					<input
						className={inputClass}
						placeholder={t('storagePlaceholder')}
						{...form.field('place')}
					/>
				</Field>
			</div>
			<SwitchCard
				label={t('autoWriteOff')}
				hint={t('autoWriteOffHint')}
				checked={!!form.values.autoWriteOff}
				onChange={form.setAuto}
			/>
		</Modal>
	)
}
