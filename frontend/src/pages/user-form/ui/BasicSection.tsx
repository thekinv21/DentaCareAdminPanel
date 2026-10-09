'use client'

import { useTranslations } from 'next-intl'

import { AffixInput } from '@/shared/ui/affix-input'
import { ChoiceChips } from '@/shared/ui/choice-chips'
import { Field, formGrid3, inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'

import { INTERFACE_LANGUAGES } from '../model/Options'
import type { TUserFormModel } from '../model/useUserForm'

type TBasicSectionProps = { form: TUserFormModel }

export function BasicSection({ form }: TBasicSectionProps) {
	const t = useTranslations('UserForm')

	return (
		<FormSection title={t('basicDetails')}>
			<div className={formGrid3}>
				<Field label={t('lastName')} required error={form.errorOf('lastName')}>
					<input
						className={inputClass}
						placeholder={t('lastNamePlaceholder')}
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
						placeholder={t('firstNamePlaceholder')}
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
					label={t('mobilePhone')}
					required
					hint={t('usedForLoginAndSms')}
					error={form.errorOf('phone')}
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
						type='email'
						className={inputClass}
						placeholder='name@denta.kg'
						{...form.field('email')}
					/>
				</Field>
				<Field label={t('birthDate')}>
					<input
						className={`${inputClass} font-mono`}
						placeholder={t('datePlaceholder')}
						{...form.field('birthDate')}
					/>
				</Field>
				<Field label={t('branch')} required>
					<select className={inputClass} {...form.field('branch')}>
						<option value='alaToo'>{t('branchAlaToo')}</option>
						<option value='jal'>{t('branchJal')}</option>
					</select>
				</Field>
				<Field as='div' label={t('interfaceLanguage')}>
					<ChoiceChips
						aria-label={t('interfaceLanguage')}
						options={INTERFACE_LANGUAGES.map(id => ({
							id,
							label: id.toUpperCase(),
						}))}
						value={form.choices.language}
						onChange={value => form.choose('language', value)}
					/>
				</Field>
				<Field as='div' label={t('gender')}>
					<ChoiceChips
						aria-label={t('gender')}
						options={[
							{ id: 'm' as const, label: t('male') },
							{ id: 'f' as const, label: t('female') },
						]}
						value={form.choices.gender}
						onChange={value => form.choose('gender', value)}
					/>
				</Field>
			</div>
		</FormSection>
	)
}
