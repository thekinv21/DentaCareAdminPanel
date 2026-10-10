'use client'

import { Stethoscope } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FormProvider } from 'react-hook-form'

import { ToggleChipsField } from '@/shared/ui/choice-chips'
import { Field, formGrid2 } from '@/shared/ui/field'
import { Modal, ModalDeleteButton, ModalFooter } from '@/shared/ui/modal'
import { SwitchCardField } from '@/shared/ui/switch-card'

import { SERVICE_MATERIALS } from '../model/ServiceFormSchema'
import type { TServiceFormModel } from '../model/useServiceForm'
import { ServiceBasics } from './ServiceBasics'

type TServiceFormModalProps = { form: TServiceFormModel }

export function ServiceFormModal({ form }: TServiceFormModalProps) {
	const t = useTranslations('ServiceForm')
	const tCommon = useTranslations('Common')
	const { control } = form.methods

	return (
		<FormProvider {...form.methods}>
			<Modal
				open={form.open}
				onClose={form.close}
				onSubmit={form.submit}
				busy={form.saving}
				icon={<Stethoscope size={20} aria-hidden='true' />}
				title={form.title}
				subtitle={form.subtitle}
				footer={
					<ModalFooter
						onCancel={form.close}
						saving={form.saving}
						submitLabel={form.isEdit ? tCommon('save') : t('addService')}
						leading={
							form.isEdit && (
								<ModalDeleteButton onClick={form.remove}>
									{t('deleteService')}
								</ModalDeleteButton>
							)
						}
					/>
				}
			>
				<ServiceBasics />
				<Field as='div' label={t('materialsTemplate')}>
					<ToggleChipsField
						control={control}
						name='materials'
						aria-label={t('materials')}
						options={SERVICE_MATERIALS.map(material => ({
							id: material,
							label: t(`material_${material}`),
						}))}
					/>
				</Field>
				<div className={formGrid2}>
					<SwitchCardField
						control={control}
						name='foms'
						label={t('coveredByFoms')}
						hint={t('coveredByFomsHint')}
					/>
					<SwitchCardField
						control={control}
						name='online'
						label={t('onlineBooking')}
						hint={t('onlineBookingHint')}
					/>
				</div>
			</Modal>
		</FormProvider>
	)
}
