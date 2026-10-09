'use client'

import { Stethoscope, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/shared/ui/button'
import { ChoiceChips, ToggleChips } from '@/shared/ui/choice-chips'
import { Field, formGrid2, inputClass } from '@/shared/ui/field'
import { Modal } from '@/shared/ui/modal'
import { Spinner } from '@/shared/ui/spinner'
import { SwitchCard } from '@/shared/ui/switch-card'

import {
	SERVICE_CATEGORIES,
	SERVICE_DURATIONS,
	SERVICE_MATERIALS,
} from '../model/ServiceFormSchema'
import { SERVICE_CATEGORY } from '../model/Services'
import type { TServiceFormModel } from '../model/useServiceForm'

type TServiceFormModalProps = { form: TServiceFormModel }

export function ServiceFormModal({ form }: TServiceFormModalProps) {
	const t = useTranslations('ServiceForm')
	const tSettings = useTranslations('Settings')
	const tCommon = useTranslations('Common')
	const { values } = form

	return (
		<Modal
			open={form.open}
			onClose={form.close}
			busy={form.saving}
			icon={<Stethoscope size={20} aria-hidden='true' />}
			title={form.title}
			subtitle={form.subtitle}
			footer={
				<>
					{form.isEdit && (
						<Button variant='dangerGhost' onClick={form.remove}>
							<Trash2 size={16} aria-hidden='true' />
							{t('deleteService')}
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
								: t('addService')}
					</Button>
				</>
			}
		>
			<div className={formGrid2}>
				<Field label={t('name')} required error={form.errorOf('name')}>
					<input
						className={inputClass}
						placeholder={t('namePlaceholder')}
						{...form.field('name')}
					/>
				</Field>
				<Field label={t('code')}>
					<input
						className={`${inputClass} font-mono`}
						placeholder='T-00'
						{...form.field('code')}
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
						options={SERVICE_CATEGORIES.map(id => ({
							id,
							label: tSettings(SERVICE_CATEGORY[id]),
						}))}
						value={values.category ?? 'ther'}
						onChange={form.setCategory}
					/>
				</Field>
				<Field label={t('priceSom')} required error={form.errorOf('price')}>
					<input
						inputMode='numeric'
						className={`${inputClass} font-mono`}
						{...form.field('price')}
					/>
				</Field>
				<Field as='div' label={t('duration')}>
					<ChoiceChips
						aria-label={t('duration')}
						options={SERVICE_DURATIONS.map(min => ({
							id: min as number,
							label: t('minutes', { n: min }),
						}))}
						value={values.minutes ?? 60}
						onChange={form.setMinutes}
					/>
				</Field>
			</div>
			<Field as='div' label={t('materialsTemplate')}>
				<ToggleChips
					aria-label={t('materials')}
					options={SERVICE_MATERIALS.map(id => ({
						id: id as string,
						label: t(`material_${id}`),
					}))}
					value={values.materials ?? []}
					onChange={form.setMaterials}
				/>
			</Field>
			<div className={formGrid2}>
				<SwitchCard
					label={t('coveredByFoms')}
					hint={t('coveredByFomsHint')}
					checked={!!values.foms}
					onChange={form.setFoms}
				/>
				<SwitchCard
					label={t('onlineBooking')}
					hint={t('onlineBookingHint')}
					checked={!!values.online}
					onChange={form.setOnline}
				/>
			</div>
		</Modal>
	)
}
