'use client'

import { useTranslations } from 'next-intl'
import { useController, useFormContext } from 'react-hook-form'

import { LOCALE_META, LOCALES, useFormat } from '@/shared/lib/i18n'
import { Field, formGrid3, inputClass } from '@/shared/ui/field'
import { RadioCard } from '@/shared/ui/radio-card'

import { LANGUAGE_NOTE } from '../model/Communication'
import type { TSettingsFormValues } from '../model/SettingsForm'
import { LanguageToggleRow } from './LanguageToggleRow'

const SAMPLE_AMOUNT = 142500

export function LanguageSection() {
	const t = useTranslations('Settings')
	const format = useFormat()
	const { control, register } = useFormContext<TSettingsFormValues>()
	const { field: defaultLanguage } = useController({
		control,
		name: 'defaultLanguage',
	})

	return (
		<div className='flex animate-fade flex-col gap-5.5 pb-2'>
			<div>
				<p className='mb-1 font-semibold'>{t('defaultLanguage')}</p>
				<p className='mb-2.5 text-[12.5px] leading-4.5 text-ink-muted'>
					{t('forNewStaffDocuments')}
				</p>
				<div
					role='radiogroup'
					aria-label={t('defaultLanguage')}
					className={formGrid3}
				>
					{LOCALES.map(locale => (
						<RadioCard
							key={locale}
							code={LOCALE_META[locale].code}
							title={LOCALE_META[locale].name}
							note={t(LANGUAGE_NOTE[locale])}
							checked={defaultLanguage.value === locale}
							onSelect={() => defaultLanguage.onChange(locale)}
						/>
					))}
				</div>
			</div>
			<div>
				<p className='mb-1 font-semibold'>{t('availableInterfaceLanguages')}</p>
				<p className='text-[12.5px] leading-4.5 text-ink-muted'>
					{t('staffChooseTheirLanguage')}
				</p>
				{LOCALES.map(locale => (
					<LanguageToggleRow
						key={locale}
						locale={locale}
						isDefault={locale === defaultLanguage.value}
					/>
				))}
			</div>
			<div className={formGrid3}>
				<Field label={t('patientSmsLanguage')}>
					<select className={inputClass} {...register('smsLanguage')}>
						<option value='patient'>{t('asInPatientRecord')}</option>
						<option value='ru'>{LOCALE_META.ru.name}</option>
						<option value='ky'>{LOCALE_META.ky.name}</option>
					</select>
				</Field>
				<Field label={t('dateFormat')}>
					<select className={inputClass} {...register('dateFormat')}>
						<option value='dmy'>09.10.2026</option>
						<option value='iso'>2026-10-09</option>
					</select>
				</Field>
				<Field label={t('amountFormat')}>
					<select className={inputClass} {...register('amountFormat')}>
						<option value='som'>{format.som(SAMPLE_AMOUNT)}</option>
						<option value='kgs'>{`${format.number(SAMPLE_AMOUNT)} KGS`}</option>
					</select>
				</Field>
			</div>
		</div>
	)
}
