'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/shared/lib/cn'
import { useFieldProps } from '@/shared/lib/form'
import { translateOptional } from '@/shared/lib/i18n'
import type { TThemePreference } from '@/shared/lib/theme'
import {
	Field,
	FormField,
	formGrid2,
	formGrid3,
	inputClass,
	textareaClass,
} from '@/shared/ui/field'
import { RadioCard } from '@/shared/ui/radio-card'

import { PROFILE_FIELDS } from '../model/Profile'
import type { TProfileFormValues } from '../model/ProfileFormSchema'
import type { TProfileSettingsModel } from '../model/useProfileSettings'

type TProfileTabProps = {
	languages: TProfileSettingsModel['languages']
	theme: TProfileSettingsModel['theme']
	themes: TProfileSettingsModel['themes']
	onThemeChange: TProfileSettingsModel['onThemeChange']
}

export function ProfileTab(props: TProfileTabProps) {
	const { languages, theme, themes, onThemeChange } = props

	const t = useTranslations('Profile')

	const { register } = useFormContext<TProfileFormValues>()

	const inputProps = useFieldProps<TProfileFormValues>()

	return (
		<div className='flex animate-fade flex-col gap-5.5 pt-0.5 pb-2'>
			<div className={formGrid2}>
				{PROFILE_FIELDS.map(field => (
					<FormField
						key={field.name}
						name={`profile.${field.name}`}
						label={translateOptional(t, field.label)}
					>
						<input
							className={cn(inputClass, 'mono' in field && 'font-mono')}
							type={'type' in field ? field.type : undefined}
							autoComplete={
								'autoComplete' in field ? field.autoComplete : undefined
							}
							{...inputProps(`profile.${field.name}`)}
						/>
					</FormField>
				))}
				<Field label={t('defaultChair')}>
					<select className={inputClass} {...register('defaultChair')}>
						<option value='chair1'>{t('chair1GeneralDentistry')}</option>
						<option value='chair2'>{t('chair2Prosthodontics')}</option>
					</select>
				</Field>
			</div>

			<div>
				<p className='mb-1 font-semibold'>{t('interfaceLanguage')}</p>
				<p className='mb-2.5 text-[12.5px] leading-4.5 text-ink-muted'>
					{t('changesTheMenuAnd')}
				</p>
				<div
					role='radiogroup'
					aria-label={t('interfaceLanguage')}
					className={formGrid3}
				>
					{languages.map(language => (
						<RadioCard
							key={language.id}
							code={language.code}
							title={language.name}
							note={language.note}
							checked={language.isChecked}
							onSelect={language.onSelect}
						/>
					))}
				</div>
			</div>

			<div className={formGrid2}>
				<Field label={t('theme')}>
					<select
						className={inputClass}
						value={theme}
						onChange={event =>
							onThemeChange(event.target.value as TThemePreference)
						}
					>
						{themes.map(item => (
							<option key={item.id} value={item.id}>
								{item.label}
							</option>
						))}
					</select>
				</Field>
				<Field label={t('defaultScheduleView')}>
					<select className={inputClass} {...register('scheduleView')}>
						<option value='week'>{t('week')}</option>
						<option value='day'>{t('day')}</option>
						<option value='month'>{t('month')}</option>
					</select>
				</Field>
				<Field label={t('signatureOnDocuments')} className='col-span-full'>
					<textarea className={textareaClass} {...register('signature')} />
				</Field>
			</div>
		</div>
	)
}
