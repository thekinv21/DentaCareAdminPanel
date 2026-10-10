'use client'

import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import { ROLE_COLORS, useRoleLabels } from '@/entities/role'

import { cn } from '@/shared/lib/cn'
import { useFieldProps } from '@/shared/lib/form'
import { AffixInput } from '@/shared/ui/affix-input'
import { Badge } from '@/shared/ui/badge'
import { ChoiceChipsField, ToggleChipsField } from '@/shared/ui/choice-chips'
import { ColorSwatches } from '@/shared/ui/color-swatches'
import {
	Field,
	FormField,
	formGrid2,
	formGrid3,
	inputClass,
} from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'
import { SwitchCardField } from '@/shared/ui/switch-card'

import { CHAIR_NUMBERS, SPECIALTIES, VISIT_DURATIONS } from '../model/Options'
import type { TUserFormValues } from '../model/UserFormSchema'

const SCHEDULE_COLORS = ROLE_COLORS.slice(0, 6)

type TMedicSectionProps = { isChief: boolean }

export function MedicSection({ isChief }: TMedicSectionProps) {
	const t = useTranslations('UserForm')

	const roleLabels = useRoleLabels()

	const { control, register } = useFormContext<TUserFormValues>()

	const inputProps = useFieldProps<TUserFormValues>()

	return (
		<FormSection
			className='animate-fade'
			title={isChief ? t('professionalDetailsChief') : t('professionalDetails')}
			aside={<Badge tone='brand'>{t('doctorFields')}</Badge>}
		>
			<FormField name='specialties' as='div' label={t('specialties')} required>
				<ToggleChipsField
					control={control}
					name='specialties'
					aria-label={t('specialties')}
					options={SPECIALTIES.map(specialty => ({
						id: specialty,
						label: t(`specialty_${specialty}`),
					}))}
				/>
			</FormField>
			<div className={formGrid3}>
				<FormField name='license' label={t('licenseNumber')} required>
					<input
						className={cn(inputClass, 'font-mono')}
						placeholder={t('licensePlaceholder')}
						{...inputProps('license')}
					/>
				</FormField>
				<FormField name='experience' label={t('experienceYears')}>
					<input
						inputMode='numeric'
						className={cn(inputClass, 'font-mono')}
						{...inputProps('experience')}
					/>
				</FormField>
				<Field label={t('defaultChair')}>
					<select
						className={inputClass}
						{...register('chair', { valueAsNumber: true })}
					>
						{CHAIR_NUMBERS.map(chair => (
							<option key={chair} value={chair}>
								{t(`chair${chair}`)}
							</option>
						))}
					</select>
				</Field>
				<Field as='div' label={t('visitDuration')}>
					<ChoiceChipsField
						control={control}
						name='duration'
						aria-label={t('visitDuration')}
						options={VISIT_DURATIONS.map(minutes => ({
							id: minutes,
							label: t('minutes', { n: minutes }),
						}))}
					/>
				</Field>
				<FormField
					name='revenuePercent'
					label={t('revenueShare')}
					hint={t('forSalaryReports')}
				>
					<AffixInput suffix='%' {...inputProps('revenuePercent')} />
				</FormField>
				<Field as='div' label={t('scheduleColor')}>
					<Controller
						control={control}
						name='color'
						render={({ field }) => (
							<ColorSwatches
								aria-label={t('scheduleColor')}
								swatches={SCHEDULE_COLORS.map(swatch => ({
									color: swatch.color,
									name: roleLabels.color(swatch.name),
								}))}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
				</Field>
			</div>
			<div className={formGrid2}>
				<SwitchCardField
					control={control}
					name='switches.onlineBooking'
					label={t('onlineBooking')}
					hint={t('onlineBookingHint')}
				/>
				{isChief && (
					<SwitchCardField
						control={control}
						name='switches.signsDocuments'
						label={t('signsDocuments')}
						hint={t('signsDocumentsHint')}
						aria-label={t('signsDocumentsShort')}
					/>
				)}
			</div>
		</FormSection>
	)
}
