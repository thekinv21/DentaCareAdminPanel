'use client'

import { useTranslations } from 'next-intl'

import { Field, formGrid3, inputClass } from '@/shared/ui/field'
import { RadioCard } from '@/shared/ui/radio-card'
import { ToggleRow } from '@/shared/ui/toggle-row'

import { LANGUAGES } from '../model/Communication'
import type { SettingsModel } from '../model/useSettings'

type TLanguageSectionProps = Pick<
	SettingsModel,
	'toggles' | 'flip' | 'defaultLanguage' | 'setDefaultLanguage'
>

export function LanguageSection(props: TLanguageSectionProps) {
	const { toggles, flip, defaultLanguage, setDefaultLanguage } = props

	const t = useTranslations('Settings')
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
					{LANGUAGES.map(language => (
						<RadioCard
							key={language.id}
							code={language.code}
							title={language.name}
							note={t(language.note)}
							checked={defaultLanguage === language.id}
							onSelect={() => setDefaultLanguage(language.id)}
						/>
					))}
				</div>
			</div>
			<div>
				<p className='mb-1 font-semibold'>{t('availableInterfaceLanguages')}</p>
				<p className='text-[12.5px] leading-4.5 text-ink-muted'>
					{t('staffChooseTheirLanguage')}
				</p>
				{LANGUAGES.map(language => {
					const locked = language.id === defaultLanguage
					const key = `l_${language.id}`
					const on = locked || toggles[key]
					return (
						<ToggleRow
							key={language.id}
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
							onChange={() => flip(key)}
						/>
					)
				})}
			</div>
			<div className={formGrid3}>
				<Field label={t('patientSmsLanguage')}>
					<select className={inputClass}>
						<option>{t('asInPatientRecord')}</option>
						<option>Русский</option>
						<option>Кыргызча</option>
					</select>
				</Field>
				<Field label={t('dateFormat')}>
					<select className={inputClass}>
						<option>09.10.2026</option>
						<option>2026-10-09</option>
					</select>
				</Field>
				<Field label={t('amountFormat')}>
					<select className={inputClass}>
						<option>{t('n142500Som')}</option>
						<option>142 500 KGS</option>
					</select>
				</Field>
			</div>
		</div>
	)
}
