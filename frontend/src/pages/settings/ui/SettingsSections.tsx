'use client'

import { useState } from 'react'

import { Pencil } from 'lucide-react'

import { PAYMENT_METHODS, PaymentMethodTile } from '@/entities/invoice'

import { cn } from '@/shared/lib/cn'
import { formatSom } from '@/shared/lib/format'
import { Badge } from '@/shared/ui/badge'
import { Field, inputClass, textareaClass } from '@/shared/ui/field'
import { IconButton } from '@/shared/ui/icon-button'
import { RadioCard } from '@/shared/ui/radio-card'
import { Segmented } from '@/shared/ui/segmented'
import { Switch } from '@/shared/ui/switch'
import { Table, Td, Th } from '@/shared/ui/table'
import { ToggleRow } from '@/shared/ui/toggle-row'

import {
	BANK_DETAILS,
	CHAIRS,
	type LanguageId,
	LANGUAGES,
	NOTIFICATIONS,
	PAYMENT_OPTIONS,
	SERVICE_CATEGORY,
	type ServiceCategory,
	SERVICES,
	WORK_DAYS,
} from '../model/settings'

export interface TogglesProps {
	toggles: Record<string, boolean>
	flip: (id: string) => void
}

const grid2 = 'grid grid-cols-2 gap-x-4 gap-y-3.5 max-[720px]:grid-cols-1'
const grid3 =
	'grid grid-cols-3 gap-x-4 gap-y-3.5 max-[1100px]:grid-cols-2 max-[720px]:grid-cols-1'

export function ClinicSection() {
	return (
		<div className='flex animate-fade flex-col gap-[22px] pt-0.5 pb-2'>
			<div className={grid2}>
				<Field label='Название клиники'>
					<input className={inputClass} defaultValue='Denta · Ала-Тоо' />
				</Field>
				<Field label='Юридическое лицо'>
					<input className={inputClass} defaultValue='ОсОО «Дента Клиник»' />
				</Field>
				<Field label='ИНН'>
					<input
						className={cn(inputClass, 'font-mono')}
						defaultValue='02410202610153'
					/>
				</Field>
				<Field label='Лицензия Минздрава КР'>
					<input
						className={cn(inputClass, 'font-mono')}
						defaultValue='№ 0417-МЗ · до 12.03.2029'
					/>
				</Field>
				<Field label='Адрес' className='col-span-full'>
					<input
						className={inputClass}
						defaultValue='г. Бишкек, ул. Токтогула 112, 1 этаж'
					/>
				</Field>
				<Field label='Телефон ресепшена'>
					<input
						className={cn(inputClass, 'font-mono')}
						defaultValue='+996 312 90 41 41'
					/>
				</Field>
				<Field label='Email'>
					<input
						className={inputClass}
						type='email'
						defaultValue='info@denta.kg'
					/>
				</Field>
				<Field label='Часовой пояс'>
					<select className={inputClass}>
						<option>Азия/Бишкек · UTC+6</option>
					</select>
				</Field>
				<Field label='Валюта'>
					<select className={inputClass}>
						<option>Кыргызский сом · KGS</option>
					</select>
				</Field>
			</div>
			<div>
				<p className='font-display text-[15px] leading-6 font-bold'>
					Кабинеты и кресла
				</p>
				<p className='mb-2.5 text-[12.5px] leading-[18px] text-ink-muted'>
					Используются в расписании и отчётах по загрузке
				</p>
				<div className='grid grid-cols-4 gap-x-4 gap-y-3.5 max-[1100px]:grid-cols-2 max-[720px]:grid-cols-1'>
					{CHAIRS.map(chair => (
						<div
							key={chair.id}
							className='flex flex-col gap-1 rounded-[14px] border border-line p-3'
						>
							<span className='font-mono text-[12.5px] text-ink-muted'>
								{chair.id}
							</span>
							<span className='font-semibold'>{chair.name}</span>
							<span className='text-[12.5px] leading-[18px] text-ink-muted'>
								{chair.doctor}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export function HoursSection({ toggles, flip }: TogglesProps) {
	return (
		<div className='animate-fade pb-2'>
			<div className={cn(grid3, 'mb-2')}>
				<Field label='Шаг записи'>
					<select className={inputClass}>
						<option>15 минут</option>
						<option>30 минут</option>
					</select>
				</Field>
				<Field label='Обед'>
					<input
						className={cn(inputClass, 'font-mono')}
						defaultValue='13:00 – 14:00'
					/>
				</Field>
				<Field label='Запись онлайн'>
					<select className={inputClass}>
						<option>За 30 дней вперёд</option>
						<option>За 14 дней</option>
					</select>
				</Field>
			</div>
			<ul>
				{WORK_DAYS.map(day => {
					const open = toggles[day.id]
					return (
						<li
							key={day.id}
							className='flex flex-wrap items-center gap-3.5 border-b border-line py-3 last:border-b-0'
						>
							<Switch
								checked={open}
								onChange={() => flip(day.id)}
								aria-label={`${day.name}: рабочий день`}
							/>
							<span className='w-[130px] font-semibold'>{day.name}</span>
							{open ? (
								<>
									<span className='flex items-center gap-2'>
										<input
											type='time'
											className={cn(inputClass, 'w-[120px] font-mono')}
											defaultValue={day.from}
											aria-label={`${day.name}: начало`}
										/>
										<span className='text-ink-muted'>—</span>
										<input
											type='time'
											className={cn(inputClass, 'w-[120px] font-mono')}
											defaultValue={day.to}
											aria-label={`${day.name}: конец`}
										/>
									</span>
									<span className='ml-auto text-[12.5px] text-ink-muted'>
										{parseInt(day.to) - parseInt(day.from)} ч
									</span>
								</>
							) : (
								<Badge>Выходной</Badge>
							)}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

type CategoryFilter = 'all' | Exclude<ServiceCategory, 'hyg'>

const CATEGORY_FILTERS: { id: CategoryFilter; label: string }[] = [
	{ id: 'all', label: 'Все' },
	{ id: 'diag', label: 'Диагностика' },
	{ id: 'ther', label: 'Терапия' },
	{ id: 'surg', label: 'Хирургия' },
	{ id: 'orth', label: 'Ортопедия' },
]

export function ServicesSection() {
	const [category, setCategory] = useState<CategoryFilter>('all')
	const rows = SERVICES.filter(
		service => category === 'all' || service.category === category,
	)

	return (
		<div className='flex animate-fade flex-col gap-3 pb-2'>
			<Segmented
				aria-label='Категория'
				options={CATEGORY_FILTERS}
				value={category}
				onChange={setCategory}
				className='self-start'
			/>
			<Table className='min-w-[760px]'>
				<thead>
					<tr>
						<Th>Код</Th>
						<Th>Услуга</Th>
						<Th>Категория</Th>
						<Th align='right'>Время</Th>
						<Th align='right'>Цена</Th>
						<Th>ФОМС</Th>
						<Th>
							<span className='sr-only'>Действия</span>
						</Th>
					</tr>
				</thead>
				<tbody>
					{rows.map(service => (
						<tr key={service.code}>
							<Td mono nowrap className='text-ink-muted'>
								{service.code}
							</Td>
							<Td className='font-semibold'>{service.name}</Td>
							<Td>
								<Badge>{SERVICE_CATEGORY[service.category]}</Badge>
							</Td>
							<Td mono nowrap align='right'>
								{service.minutes} мин
							</Td>
							<Td mono nowrap align='right' className='font-semibold'>
								{formatSom(service.price)}
							</Td>
							<Td>
								<Badge tone={service.foms ? 'ok' : 'neutral'}>
									{service.foms ? 'Покрывает' : 'Нет'}
								</Badge>
							</Td>
							<Td align='right'>
								<IconButton
									quiet
									size='sm'
									aria-label={`Изменить: ${service.name}`}
								>
									<Pencil size={16} aria-hidden='true' />
								</IconButton>
							</Td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}

export function PaymentSection({ toggles, flip }: TogglesProps) {
	return (
		<div className='flex animate-fade flex-col gap-3 pb-2'>
			{BANK_DETAILS.map(bank => {
				const method = PAYMENT_METHODS[bank.id]
				const on = toggles[bank.id]
				return (
					<div
						key={bank.id}
						className={cn(
							'flex flex-col gap-3 rounded-2xl border border-line p-3.5',
							on ? 'bg-surface' : 'bg-raised',
						)}
					>
						<div className='flex items-center gap-3'>
							<PaymentMethodTile method={bank.id} size='lg' />
							<div className='min-w-0 flex-grow'>
								<div className='flex items-center gap-2'>
									<span className='font-bold'>{method.name}</span>
									<Badge tone={on ? 'ok' : 'neutral'}>
										{on ? 'Подключено' : 'Отключено'}
									</Badge>
								</div>
								<p className='text-[12.5px] leading-[18px] text-ink-muted'>
									{bank.description}
								</p>
							</div>
							<Switch
								checked={on}
								onChange={() => flip(bank.id)}
								aria-label={`Принимать оплату: ${method.name}`}
							/>
						</div>
						{on && (
							<dl className='grid grid-cols-4 gap-x-4 gap-y-3.5 border-t border-dashed border-line pt-3 max-[1100px]:grid-cols-2'>
								{bank.meta.map(([key, value]) => (
									<div key={key}>
										<dt className='text-[12.5px] text-ink-muted'>{key}</dt>
										<dd className='font-mono text-[13px] font-semibold'>
											{value}
										</dd>
									</div>
								))}
							</dl>
						)}
					</div>
				)
			})}
			<div className='rounded-2xl border border-line px-3.5 py-1'>
				{PAYMENT_OPTIONS.map(option => (
					<ToggleRow
						key={option.id}
						label={option.label}
						hint={option.hint}
						checked={toggles[option.id]}
						onChange={() => flip(option.id)}
					/>
				))}
			</div>
		</div>
	)
}

interface LanguageSectionProps extends TogglesProps {
	defaultLanguage: LanguageId
	onDefaultLanguage: (id: LanguageId) => void
}

export function LanguageSection({
	toggles,
	flip,
	defaultLanguage,
	onDefaultLanguage,
}: LanguageSectionProps) {
	return (
		<div className='flex animate-fade flex-col gap-[22px] pb-2'>
			<div>
				<p className='mb-1 font-semibold'>Язык по умолчанию</p>
				<p className='mb-2.5 text-[12.5px] leading-[18px] text-ink-muted'>
					Для новых сотрудников, документов и печатных форм
				</p>
				<div role='radiogroup' aria-label='Язык по умолчанию' className={grid3}>
					{LANGUAGES.map(language => (
						<RadioCard
							key={language.id}
							code={language.code}
							title={language.name}
							note={language.note}
							checked={defaultLanguage === language.id}
							onSelect={() => onDefaultLanguage(language.id)}
						/>
					))}
				</div>
			</div>
			<div>
				<p className='mb-1 font-semibold'>Доступные языки интерфейса</p>
				<p className='text-[12.5px] leading-[18px] text-ink-muted'>
					Сотрудники выбирают язык в своём профиле
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
									{locked ? 'По умолчанию' : on ? 'Включён' : 'Выключен'}
								</span>
							}
							checked={on}
							disabled={locked}
							onChange={() => flip(key)}
						/>
					)
				})}
			</div>
			<div className={grid3}>
				<Field label='Язык SMS для пациентов'>
					<select className={inputClass}>
						<option>Как в карте пациента</option>
						<option>Русский</option>
						<option>Кыргызча</option>
					</select>
				</Field>
				<Field label='Формат даты'>
					<select className={inputClass}>
						<option>09.10.2026</option>
						<option>2026-10-09</option>
					</select>
				</Field>
				<Field label='Формат суммы'>
					<select className={inputClass}>
						<option>142 500 сом</option>
						<option>142 500 KGS</option>
					</select>
				</Field>
			</div>
		</div>
	)
}

export function NotificationsSection({ toggles, flip }: TogglesProps) {
	return (
		<div className='flex animate-fade flex-col gap-[18px] pb-2'>
			<div>
				{NOTIFICATIONS.map(item => (
					<ToggleRow
						key={item.id}
						label={item.label}
						hint={item.hint}
						meta={<Badge>{item.channel}</Badge>}
						checked={toggles[item.id]}
						onChange={() => flip(item.id)}
					/>
				))}
			</div>
			<div className={grid2}>
				<Field label='Шаблон напоминания · RU'>
					<textarea
						className={textareaClass}
						defaultValue='Здравствуйте, {имя}! Напоминаем о записи в Denta {дата} в {время}. Врач: {врач}. Ответьте 1 — подтвердить, 2 — перенести.'
					/>
				</Field>
				<Field label='Шаблон напоминания · KY'>
					<textarea
						className={textareaClass}
						defaultValue='Саламатсызбы, {аты}! Denta клиникасына {күнү} саат {убакыт} жазылууңузду эскертебиз. Дарыгер: {дарыгер}.'
					/>
				</Field>
			</div>
			<p className='text-[12.5px] leading-[18px] text-ink-muted'>
				SMS-шлюз: Nikita.kg · баланс{' '}
				<span className='font-mono font-semibold text-ink'>4 280 сом</span> · ≈
				3 560 сообщений
			</p>
		</div>
	)
}
