'use client'

import { useI18n } from '@/shared/lib/i18n'
import { Field, formGrid3, inputClass } from '@/shared/ui/field'
import { RadioCard } from '@/shared/ui/radio-card'
import { ToggleRow } from '@/shared/ui/toggle-row'

import { LANGUAGES } from '../model/communication'
import type { SettingsModel } from '../model/use-settings'

type LanguageSectionProps = Pick<
	SettingsModel,
	'toggles' | 'flip' | 'defaultLanguage' | 'setDefaultLanguage'
>

export function LanguageSection({
	toggles,
	flip,
	defaultLanguage,
	setDefaultLanguage,
}: LanguageSectionProps) {
	const { t } = useI18n()
	return (
		<div className='flex animate-fade flex-col gap-[22px] pb-2'>
			<div>
				<p className='mb-1 font-semibold'>{t('Язык по умолчанию')}</p>
				<p className='mb-2.5 text-[12.5px] leading-[18px] text-ink-muted'>
					{t('Для новых сотрудников, документов и печатных форм')}
				</p>
				<div
					role='radiogroup'
					aria-label={t('Язык по умолчанию')}
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
				<p className='mb-1 font-semibold'>{t('Доступные языки интерфейса')}</p>
				<p className='text-[12.5px] leading-[18px] text-ink-muted'>
					{t('Сотрудники выбирают язык в своём профиле')}
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
									{t(locked ? 'По умолчанию' : on ? 'Включён' : 'Выключен')}
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
				<Field label={t('Язык SMS для пациентов')}>
					<select className={inputClass}>
						<option>{t('Как в карте пациента')}</option>
						<option>Русский</option>
						<option>Кыргызча</option>
					</select>
				</Field>
				<Field label={t('Формат даты')}>
					<select className={inputClass}>
						<option>09.10.2026</option>
						<option>2026-10-09</option>
					</select>
				</Field>
				<Field label={t('Формат суммы')}>
					<select className={inputClass}>
						<option>{t('142 500 сом')}</option>
						<option>142 500 KGS</option>
					</select>
				</Field>
			</div>
		</div>
	)
}
