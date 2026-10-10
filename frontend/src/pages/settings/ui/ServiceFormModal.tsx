'use client'

import { Stethoscope, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Controller, FormProvider } from 'react-hook-form'

import { Button } from '@/shared/ui/button'
import { ToggleChips } from '@/shared/ui/choice-chips'
import { Field, formGrid2 } from '@/shared/ui/field'
import { Modal } from '@/shared/ui/modal'
import { Spinner } from '@/shared/ui/spinner'
import { SwitchCard } from '@/shared/ui/switch-card'

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
					<>
						{form.isEdit && (
							<Button variant='dangerGhost' onClick={form.remove}>
								<Trash2 size={16} aria-hidden='true' />
								{t('deleteService')}
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
									: t('addService')}
						</Button>
					</>
				}
			>
				<ServiceBasics />
				<Field as='div' label={t('materialsTemplate')}>
					<Controller
						control={control}
						name='materials'
						render={({ field }) => (
							<ToggleChips
								aria-label={t('materials')}
								options={SERVICE_MATERIALS.map(id => ({
									id: id as string,
									label: t(`material_${id}`),
								}))}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
				</Field>
				<div className={formGrid2}>
					<Controller
						control={control}
						name='foms'
						render={({ field }) => (
							<SwitchCard
								label={t('coveredByFoms')}
								hint={t('coveredByFomsHint')}
								checked={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
					<Controller
						control={control}
						name='online'
						render={({ field }) => (
							<SwitchCard
								label={t('onlineBooking')}
								hint={t('onlineBookingHint')}
								checked={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
				</div>
			</Modal>
		</FormProvider>
	)
}
