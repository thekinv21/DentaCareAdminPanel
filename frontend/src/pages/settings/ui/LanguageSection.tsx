'use client'

import { useTranslations } from 'next-intl'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import { Field, formGrid3, inputClass } from '@/shared/ui/field'
import { RadioCard } from '@/shared/ui/radio-card'
import { ToggleRow } from '@/shared/ui/toggle-row'

import { LANGUAGES } from '../model/Communication'
import type { TSettingsFormValues } from '../model/SettingsForm'

export function LanguageSection() {
	const t = useTranslations('Settings')
	const { control, register } = useFormContext<TSettingsFormValues>()
	const defaultLanguage = useWatch({ control, name: 'defaultLanguage' })

	return (
		<div className='flex animate-fade flex-col gap-5.5 pb-2'>
			<div>
				<p className='mb-1 font-semibold'>{t('defaultLanguage')}</p>
				<p className='mb-2.5 text-[12.5px] leading-4.5 text-ink-muted'>
					{t('forNewStaffDocuments')}
				</p>
				<Controller
					control={control}
					name='defaultLanguage'
					render={({ field }) => (
						<div
							role='radiogroup'
							aria-label={t('defaultLanguage')}
							className={formGrid3}
						>
							{LANGUAGES.map(language => (
								<RadioCard
									key={language.id}
									code={language.code}
									title={language.name}
									note={t(language.note)}
									checked={field.value === language.id}
									onSelect={() => field.onChange(language.id)}
								/>
							))}
						</div>
					)}
				/>
			</div>
			<div>
				<p className='mb-1 font-semibold'>{t('availableInterfaceLanguages')}</p>
				<p className='text-[12.5px] leading-4.5 text-ink-muted'>
					{t('staffChooseTheirLanguage')}
				</p>
				{LANGUAGES.map(language => {
					const locked = language.id === defaultLanguage
					return (
						<Controller
							key={language.id}
							control={control}
							name={`toggles.l_${language.id}`}
							render={({ field }) => {
								const on = locked || field.value
								return (
									<ToggleRow
										label={language.name}
										leading={
											<span className='inline-flex size-8 shrink-0 items-center justify-center rounded-xl bg-sunken font-mono text-[11px] font-bold'>
												{language.code}
											</span>
										}
										meta={
											<span className='text-[12.5px] text-ink-muted'>
												{t(locked ? 'default' : on ? 'on' : 'off')}
											</span>
										}
										checked={on}
										disabled={locked}
										onChange={field.onChange}
									/>
								)
							}}
						/>
					)
				})}
			</div>
			<div className={formGrid3}>
				<Field label={t('patientSmsLanguage')}>
					<select className={inputClass} {...register('smsLanguage')}>
						<option value='patient'>{t('asInPatientRecord')}</option>
						<option value='ru'>Русский</option>
						<option value='ky'>Кыргызча</option>
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
						<option value='som'>{t('n142500Som')}</option>
						<option value='kgs'>142 500 KGS</option>
					</select>
				</Field>
			</div>
		</div>
	)
}
