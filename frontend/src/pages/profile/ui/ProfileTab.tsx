'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { translateOptional } from '@/shared/lib/i18n'
import type { ThemePreference } from '@/shared/lib/theme'
import {
	Field,
	formGrid2,
	formGrid3,
	inputClass,
	textareaClass,
} from '@/shared/ui/field'
import { RadioCard } from '@/shared/ui/radio-card'

import type { ProfileSettingsModel } from '../model/useProfileSettings'

const FIELDS = [
	{ label: 'lastName', value: 'kasymova', autoComplete: 'family-name' },
	{ label: 'firstName', value: 'aigerim', autoComplete: 'given-name' },
	{ label: 'position', value: 'chiefDentist' },
	{ label: 'specialty', value: 'generalDentistEndodontist' },
	{ label: 'phone', value: '+996 555 701 441', mono: true, type: 'tel' },
	{ label: 'Email', value: 'a.kasymova@denta.kg', type: 'email' },
	{
		label: 'diplomaCertificateNumber',
		value: 'ksma20140912',
		mono: true,
	},
]

export function ProfileTab({ model }: { model: ProfileSettingsModel }) {
	const t = useTranslations('Profile')
	return (
		<div className='flex animate-fade flex-col gap-5.5 pt-0.5 pb-2'>
			<div className={formGrid2}>
				{FIELDS.map(field => (
					<Field key={field.label} label={translateOptional(t, field.label)}>
						<input
							className={cn(inputClass, field.mono && 'font-mono')}
							type={field.type}
							autoComplete={field.autoComplete}
							defaultValue={translateOptional(t, field.value)}
						/>
					</Field>
				))}
				<Field label={t('defaultChair')}>
					<select className={inputClass}>
						<option>{t('chair1GeneralDentistry')}</option>
						<option>{t('chair2Prosthodontics')}</option>
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
					{model.languages.map(language => (
						<RadioCard
							key={language.id}
							code={language.code}
							title={language.name}
							note={language.note}
							checked={language.checked}
							onSelect={language.select}
						/>
					))}
				</div>
			</div>

			<div className={formGrid2}>
				<Field label={t('theme')}>
					<select
						className={inputClass}
						value={model.theme}
						onChange={event =>
							model.setTheme(event.target.value as ThemePreference)
						}
					>
						{model.themes.map(item => (
							<option key={item.id} value={item.id}>
								{item.label}
							</option>
						))}
					</select>
				</Field>
				<Field label={t('defaultScheduleView')}>
					<select className={inputClass}>
						<option>{t('week')}</option>
						<option>{t('day')}</option>
						<option>{t('month')}</option>
					</select>
				</Field>
				<Field label={t('signatureOnDocuments')} className='col-span-full'>
					<textarea
						className={textareaClass}
						defaultValue={t('kasymovaABChief')}
					/>
				</Field>
			</div>
		</div>
	)
}
