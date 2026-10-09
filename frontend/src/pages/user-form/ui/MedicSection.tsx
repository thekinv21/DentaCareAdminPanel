'use client'

import { useTranslations } from 'next-intl'

import { ROLE_COLORS, useRoleLabels } from '@/entities/role'

import { AffixInput } from '@/shared/ui/affix-input'
import { Badge } from '@/shared/ui/badge'
import { ChoiceChips, ToggleChips } from '@/shared/ui/choice-chips'
import { ColorSwatches } from '@/shared/ui/color-swatches'
import { Field, formGrid2, formGrid3, inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'
import { SwitchCard } from '@/shared/ui/switch-card'

import { CHAIRS, SPECIALTIES, VISIT_DURATIONS } from '../model/Options'
import type { TUserFormModel } from '../model/useUserForm'

const SCHEDULE_COLORS = ROLE_COLORS.slice(0, 6)

type TMedicSectionProps = { form: TUserFormModel }

export function MedicSection({ form }: TMedicSectionProps) {
	const t = useTranslations('UserForm')
	const roleLabels = useRoleLabels()

	return (
		<FormSection
			className='animate-fade'
			title={
				form.show.chief
					? t('professionalDetailsChief')
					: t('professionalDetails')
			}
			aside={<Badge tone='brand'>{t('doctorFields')}</Badge>}
		>
			<Field as='div' label={t('specialties')} required>
				<ToggleChips
					aria-label={t('specialties')}
					options={SPECIALTIES.map(id => ({ id: id as string, label: t(id) }))}
					value={form.choices.specialties}
					onChange={value => form.choose('specialties', value)}
				/>
			</Field>
			<div className={formGrid3}>
				<Field
					label={t('licenseNumber')}
					required
					error={form.errorOf('license')}
				>
					<input
						className={`${inputClass} font-mono`}
						placeholder={t('licensePlaceholder')}
						{...form.field('license')}
					/>
				</Field>
				<Field label={t('experienceYears')}>
					<input
						type='number'
						min={0}
						className={`${inputClass} font-mono`}
						{...form.field('experience')}
					/>
				</Field>
				<Field label={t('defaultChair')}>
					<select className={inputClass} {...form.field('chair')}>
						{CHAIRS.map(chair => (
							<option key={chair} value={chair}>
								{t(chair)}
							</option>
						))}
					</select>
				</Field>
				<Field as='div' label={t('visitDuration')}>
					<ChoiceChips
						aria-label={t('visitDuration')}
						options={VISIT_DURATIONS.map(min => ({
							id: min as number,
							label: t('minutes', { n: min }),
						}))}
						value={form.choices.duration}
						onChange={value => form.choose('duration', value)}
					/>
				</Field>
				<Field label={t('revenueShare')} hint={t('forSalaryReports')}>
					<AffixInput suffix='%' {...form.field('revenuePercent')} />
				</Field>
				<Field as='div' label={t('scheduleColor')}>
					<ColorSwatches
						aria-label={t('scheduleColor')}
						swatches={SCHEDULE_COLORS.map(c => ({
							color: c.color,
							name: roleLabels.color(c.name),
						}))}
						value={form.choices.color}
						onChange={value => form.choose('color', value)}
					/>
				</Field>
			</div>
			<div className={formGrid2}>
				<SwitchCard
					label={t('onlineBooking')}
					hint={t('onlineBookingHint')}
					checked={form.switches.online}
					onChange={form.flip('online')}
				/>
				{form.show.chief && (
					<SwitchCard
						label={t('signsDocuments')}
						hint={t('signsDocumentsHint')}
						aria-label={t('signsDocumentsShort')}
						checked={form.switches.sign}
						onChange={form.flip('sign')}
					/>
				)}
			</div>
		</FormSection>
	)
}
