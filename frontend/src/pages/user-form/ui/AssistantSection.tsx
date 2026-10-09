'use client'

import { useTranslations } from 'next-intl'

import { useFormat } from '@/shared/lib/i18n'
import { Badge } from '@/shared/ui/badge'
import { ToggleChips } from '@/shared/ui/choice-chips'
import { Field, formGrid2, inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'
import { SwitchCard } from '@/shared/ui/switch-card'

import { ASSISTANT_DOCTORS, CHAIRS, QUALIFICATIONS } from '../model/Options'
import type { TUserFormModel } from '../model/useUserForm'

type TAssistantSectionProps = { form: TUserFormModel }

export function AssistantSection({ form }: TAssistantSectionProps) {
	const t = useTranslations('UserForm')
	const format = useFormat()

	return (
		<FormSection
			className='animate-fade'
			title={t('workingWithDoctors')}
			aside={<Badge tone='info'>{t('assistantFields')}</Badge>}
		>
			<Field
				as='div'
				label={t('assignedDoctors')}
				required
				hint={t('assignedDoctorsHint')}
			>
				<ToggleChips
					aria-label={t('assignedDoctors')}
					options={ASSISTANT_DOCTORS.map(doc => ({
						id: doc.id as string,
						label: format.name(doc.name),
					}))}
					value={form.choices.doctors}
					onChange={value => form.choose('doctors', value)}
				/>
			</Field>
			<div className={formGrid2}>
				<Field label={t('mainChair')}>
					<select className={inputClass} {...form.field('chair')}>
						{CHAIRS.slice(0, 3).map(chair => (
							<option key={chair} value={chair}>
								{t(chair)}
							</option>
						))}
					</select>
				</Field>
				<Field label={t('qualification')}>
					<select className={inputClass} {...form.field('qualification')}>
						{QUALIFICATIONS.map(item => (
							<option key={item} value={item}>
								{t(item)}
							</option>
						))}
					</select>
				</Field>
				<SwitchCard
					label={t('writeOffMaterials')}
					hint={t('writeOffMaterialsHint')}
					aria-label={t('writeOffMaterialsShort')}
					checked={form.switches.stock}
					onChange={form.flip('stock')}
				/>
				<SwitchCard
					label={t('markDentalChart')}
					hint={t('markDentalChartHint')}
					checked={form.switches.chart}
					onChange={form.flip('chart')}
				/>
			</div>
		</FormSection>
	)
}
