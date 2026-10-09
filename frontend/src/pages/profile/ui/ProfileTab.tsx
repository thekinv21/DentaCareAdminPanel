'use client'

import { cn } from '@/shared/lib/cn'
import { useI18n } from '@/shared/lib/i18n'
import type { ThemePreference } from '@/shared/lib/theme'
import {
	Field,
	formGrid2,
	formGrid3,
	inputClass,
	textareaClass,
} from '@/shared/ui/field'
import { RadioCard } from '@/shared/ui/radio-card'

import type { ProfileSettingsModel } from '../model/use-profile-settings'

const FIELDS = [
	{ label: 'Фамилия', value: 'Касымова', autoComplete: 'family-name' },
	{ label: 'Имя', value: 'Айгерим', autoComplete: 'given-name' },
	{ label: 'Должность', value: 'Главный врач' },
	{ label: 'Специализация', value: 'Стоматолог-терапевт, эндодонтист' },
	{ label: 'Телефон', value: '+996 555 701 441', mono: true, type: 'tel' },
	{ label: 'Email', value: 'a.kasymova@denta.kg', type: 'email' },
	{
		label: 'Номер диплома / сертификата',
		value: 'КГМА 2014 · СТ-0912',
		mono: true,
	},
]

export function ProfileTab({ model }: { model: ProfileSettingsModel }) {
	const { t } = useI18n()
	return (
		<div className='flex animate-fade flex-col gap-[22px] pt-0.5 pb-2'>
			<div className={formGrid2}>
				{FIELDS.map(field => (
					<Field key={field.label} label={t(field.label)}>
						<input
							className={cn(inputClass, field.mono && 'font-mono')}
							type={field.type}
							autoComplete={field.autoComplete}
							defaultValue={t(field.value)}
						/>
					</Field>
				))}
				<Field label={t('Кресло по умолчанию')}>
					<select className={inputClass}>
						<option>{t('Кресло 1 · Терапия')}</option>
						<option>{t('Кресло 2 · Ортопедия')}</option>
					</select>
				</Field>
			</div>

			<div>
				<p className='mb-1 font-semibold'>{t('Язык интерфейса')}</p>
				<p className='mb-2.5 text-[12.5px] leading-[18px] text-ink-muted'>
					{t(
						'Меняет язык меню и интерфейса для вас. Документы пациентам — по настройкам клиники.',
					)}
				</p>
				<div
					role='radiogroup'
					aria-label={t('Язык интерфейса')}
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
				<Field label={t('Тема')}>
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
				<Field label={t('Вид расписания по умолчанию')}>
					<select className={inputClass}>
						<option>{t('Неделя')}</option>
						<option>{t('День')}</option>
						<option>{t('Месяц')}</option>
					</select>
				</Field>
				<Field label={t('Подпись в документах')} className='col-span-full'>
					<textarea
						className={textareaClass}
						defaultValue={t(
							'Касымова А. Б., главный врач, стоматолог-терапевт. Denta · Ала-Тоо, г. Бишкек.',
						)}
					/>
				</Field>
			</div>
		</div>
	)
}
