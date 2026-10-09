'use client'

import { useTranslations } from 'next-intl'

import { AffixInput } from '@/shared/ui/affix-input'
import { ChoiceChips } from '@/shared/ui/choice-chips'
import { Field, formGrid3, inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'

import type { TPatientFormModel } from '../model/usePatientForm'

type TPatientPersonalFieldsProps = { form: TPatientFormModel }

export function PatientPersonalFields({ form }: TPatientPersonalFieldsProps) {
	const t = useTranslations('PatientForm')
	return (
		<>
			<FormSection title={t('personalDetails')}>
				<div className={formGrid3}>
					<Field
						label={t('lastName')}
						required
						error={form.errorOf('lastName')}
					>
						<input
							className={inputClass}
							placeholder={t('lastName')}
							{...form.field('lastName')}
						/>
					</Field>
					<Field
						label={t('firstName')}
						required
						error={form.errorOf('firstName')}
					>
						<input
							className={inputClass}
							placeholder={t('firstName')}
							{...form.field('firstName')}
						/>
					</Field>
					<Field label={t('middleName')}>
						<input
							className={inputClass}
							placeholder={t('optional')}
							{...form.field('middleName')}
						/>
					</Field>
					<Field
						label={t('birthDate')}
						required
						error={form.errorOf('birthDate')}
					>
						<input
							className={`${inputClass} font-mono`}
							placeholder={t('datePlaceholder')}
							{...form.field('birthDate')}
						/>
					</Field>
					<Field as='div' label={t('gender')}>
						<ChoiceChips
							aria-label={t('gender')}
							options={[
								{ id: 'f' as const, label: t('female') },
								{ id: 'm' as const, label: t('male') },
							]}
							value={form.values.gender ?? 'f'}
							onChange={value => form.set('gender', value)}
						/>
					</Field>
					<Field label={t('pin')} error={form.errorOf('pin')}>
						<input
							className={`${inputClass} font-mono`}
							placeholder={t('pinPlaceholder')}
							{...form.field('pin')}
						/>
					</Field>
				</div>
			</FormSection>
			<FormSection title={t('contacts')}>
				<div className={formGrid3}>
					<Field
						label={t('phone')}
						required
						error={form.errorOf('phone') ?? form.duplicateError}
					>
						<AffixInput
							prefix='+996'
							type='tel'
							inputMode='tel'
							placeholder='555 123 456'
							{...form.field('phone')}
						/>
					</Field>
					<Field label='Email' error={form.errorOf('email')}>
						<input
							className={inputClass}
							placeholder='name@mail.kg'
							{...form.field('email')}
						/>
					</Field>
					<Field as='div' label={t('smsLanguage')}>
						<ChoiceChips
							aria-label={t('smsLanguage')}
							options={[
								{ id: 'ru' as const, label: 'Русский' },
								{ id: 'ky' as const, label: 'Кыргызча' },
							]}
							value={form.values.smsLanguage ?? 'ru'}
							onChange={value => form.set('smsLanguage', value)}
						/>
					</Field>
					<Field label={t('address')} className='col-span-full'>
						<input
							className={inputClass}
							placeholder={t('addressPlaceholder')}
							{...form.field('address')}
						/>
					</Field>
				</div>
			</FormSection>
		</>
	)
}
