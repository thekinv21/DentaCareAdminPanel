'use client'

import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import { ROLE_COLORS, useRoleLabels } from '@/entities/role'

import { useFieldProps } from '@/shared/lib/form'
import { AffixInput } from '@/shared/ui/affix-input'
import { Badge } from '@/shared/ui/badge'
import { ChoiceChips, ToggleChips } from '@/shared/ui/choice-chips'
import { ColorSwatches } from '@/shared/ui/color-swatches'
import {
	Field,
	FormField,
	formGrid2,
	formGrid3,
	inputClass,
} from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'

import { CHAIRS, SPECIALTIES, VISIT_DURATIONS } from '../model/Options'
import type { TUserFormValues } from '../model/Schema'
import { UserSwitch } from './UserSwitch'

const SCHEDULE_COLORS = ROLE_COLORS.slice(0, 6)

type TMedicSectionProps = { isChief: boolean }

export function MedicSection({ isChief }: TMedicSectionProps) {
	const t = useTranslations('UserForm')
	const roleLabels = useRoleLabels()
	const { control } = useFormContext<TUserFormValues>()
	const inputProps = useFieldProps<TUserFormValues>()

	return (
		<FormSection
			className='animate-fade'
			title={isChief ? t('professionalDetailsChief') : t('professionalDetails')}
			aside={<Badge tone='brand'>{t('doctorFields')}</Badge>}
		>
			<Field as='div' label={t('specialties')} required>
				<Controller
					control={control}
					name='specialties'
					render={({ field }) => (
						<ToggleChips
							aria-label={t('specialties')}
							options={SPECIALTIES.map(id => ({
								id: id as string,
								label: t(id),
							}))}
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</Field>
			<div className={formGrid3}>
				<FormField name='license' label={t('licenseNumber')} required>
					<input
						className={`${inputClass} font-mono`}
						placeholder={t('licensePlaceholder')}
						{...inputProps('license')}
					/>
				</FormField>
				<Field label={t('experienceYears')}>
					<input
						type='number'
						min={0}
						className={`${inputClass} font-mono`}
						{...inputProps('experience')}
					/>
				</Field>
				<Field label={t('defaultChair')}>
					<select className={inputClass} {...inputProps('chair')}>
						{CHAIRS.map(chair => (
							<option key={chair} value={chair}>
								{t(chair)}
							</option>
						))}
					</select>
				</Field>
				<Field as='div' label={t('visitDuration')}>
					<Controller
						control={control}
						name='duration'
						render={({ field }) => (
							<ChoiceChips
								aria-label={t('visitDuration')}
								options={VISIT_DURATIONS.map(min => ({
									id: min as number,
									label: t('minutes', { n: min }),
								}))}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
				</Field>
				<Field label={t('revenueShare')} hint={t('forSalaryReports')}>
					<AffixInput suffix='%' {...inputProps('revenuePercent')} />
				</Field>
				<Field as='div' label={t('scheduleColor')}>
					<Controller
						control={control}
						name='color'
						render={({ field }) => (
							<ColorSwatches
								aria-label={t('scheduleColor')}
								swatches={SCHEDULE_COLORS.map(c => ({
									color: c.color,
									name: roleLabels.color(c.name),
								}))}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
				</Field>
			</div>
			<div className={formGrid2}>
				<UserSwitch
					name='online'
					label={t('onlineBooking')}
					hint={t('onlineBookingHint')}
				/>
				{isChief && (
					<UserSwitch
						name='sign'
						label={t('signsDocuments')}
						hint={t('signsDocumentsHint')}
						ariaLabel={t('signsDocumentsShort')}
					/>
				)}
			</div>
		</FormSection>
	)
}
