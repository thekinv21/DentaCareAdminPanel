'use client'

import { cn } from '@/shared/lib/cn'
import { useI18n } from '@/shared/lib/i18n'
import { Field, formGrid2, inputClass } from '@/shared/ui/field'

import { CHAIRS } from '../model/clinic'

const TEXT_FIELDS = [
	{ label: 'Название клиники', value: 'Denta · Ала-Тоо' },
	{ label: 'Юридическое лицо', value: 'ОсОО «Дента Клиник»' },
	{ label: 'ИНН', value: '02410202610153', mono: true },
	{
		label: 'Лицензия Минздрава КР',
		value: '№ 0417-МЗ · до 12.03.2029',
		mono: true,
	},
	{ label: 'Адрес', value: 'г. Бишкек, ул. Токтогула 112, 1 этаж', wide: true },
	{ label: 'Телефон ресепшена', value: '+996 312 90 41 41', mono: true },
	{ label: 'Email', value: 'info@denta.kg' },
]

export function ClinicSection() {
	const { t, format } = useI18n()
	return (
		<div className='flex animate-fade flex-col gap-[22px] pt-0.5 pb-2'>
			<div className={formGrid2}>
				{TEXT_FIELDS.map(field => (
					<Field
						key={field.label}
						label={t(field.label)}
						className={field.wide ? 'col-span-full' : undefined}
					>
						<input
							className={cn(inputClass, field.mono && 'font-mono')}
							defaultValue={t(field.value)}
						/>
					</Field>
				))}
				<Field label={t('Часовой пояс')}>
					<select className={inputClass}>
						<option>{t('Азия/Бишкек · UTC+6')}</option>
					</select>
				</Field>
				<Field label={t('Валюта')}>
					<select className={inputClass}>
						<option>{t('Кыргызский сом · KGS')}</option>
					</select>
				</Field>
			</div>
			<div>
				<p className='font-display text-[15px] leading-6 font-bold'>
					{t('Кабинеты и кресла')}
				</p>
				<p className='mb-2.5 text-[12.5px] leading-[18px] text-ink-muted'>
					{t('Используются в расписании и отчётах по загрузке')}
				</p>
				<div className='grid grid-cols-4 gap-x-4 gap-y-3.5 max-[1100px]:grid-cols-2 max-[720px]:grid-cols-1'>
					{CHAIRS.map(chair => (
						<div
							key={chair.id}
							className='flex flex-col gap-1 rounded-[14px] border border-line p-3'
						>
							<span className='font-mono text-[12.5px] text-ink-muted'>
								{t(chair.id)}
							</span>
							<span className='font-semibold'>{t(chair.name)}</span>
							<span className='text-[12.5px] leading-[18px] text-ink-muted'>
								{format.name(chair.doctor)}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
