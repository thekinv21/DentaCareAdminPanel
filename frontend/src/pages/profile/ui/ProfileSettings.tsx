'use client'

import { useState } from 'react'

import { Monitor } from 'lucide-react'

import { cn } from '@/shared/lib/cn'
import { type ThemePreference, useTheme } from '@/shared/lib/theme'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Field, inputClass, textareaClass } from '@/shared/ui/field'
import { FormFooter } from '@/shared/ui/form-footer'
import { RadioCard } from '@/shared/ui/radio-card'
import { Segmented } from '@/shared/ui/segmented'
import { Switch } from '@/shared/ui/switch'
import { Table, Td, Th } from '@/shared/ui/table'
import { ToggleRow } from '@/shared/ui/toggle-row'

import {
	INITIAL_PREFERENCES,
	INTERFACE_LANGUAGES,
	NOTIFICATION_CHANNELS,
	NOTIFICATION_EVENTS,
	SECURITY_OPTIONS,
	SESSIONS,
} from '../model/profile'

type Tab = 'profile' | 'security' | 'notifications'

const TABS: { id: Tab; label: string }[] = [
	{ id: 'profile', label: 'Профиль' },
	{ id: 'security', label: 'Безопасность' },
	{ id: 'notifications', label: 'Уведомления' },
]

const THEMES: { id: ThemePreference; label: string }[] = [
	{ id: 'system', label: 'Как в системе' },
	{ id: 'light', label: 'Светлая' },
	{ id: 'dark', label: 'Тёмная' },
]

const grid2 = 'grid grid-cols-2 gap-x-4 gap-y-3.5 max-[720px]:grid-cols-1'
const grid3 =
	'grid grid-cols-3 gap-x-4 gap-y-3.5 max-[1100px]:grid-cols-2 max-[720px]:grid-cols-1'

export function ProfileSettings() {
	const { theme, setTheme } = useTheme()
	const [tab, setTab] = useState<Tab>('profile')
	const [prefs, setPrefs] = useState(INITIAL_PREFERENCES)
	const [language, setLanguage] = useState('ru')
	const [ended, setEnded] = useState<string[]>([])
	const [saved, setSaved] = useState(false)

	const flip = (id: string) => {
		setPrefs(current => ({ ...current, [id]: !current[id] }))
		setSaved(false)
	}

	const sessions = SESSIONS.filter(session => !ended.includes(session.id))

	return (
		<Card
			as='section'
			className='min-h-0 min-w-0 flex-auto max-[720px]:flex-none'
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<Segmented
					aria-label='Раздел профиля'
					options={TABS}
					value={tab}
					onChange={next => {
						setTab(next)
						setSaved(false)
					}}
				/>
				<p className='text-[12.5px] leading-[18px] text-ink-muted'>
					Последний вход: сегодня, 08:24 · Chrome, Windows
				</p>
			</div>

			<div className='-mx-[18px] min-h-0 flex-auto overflow-auto px-[18px] scrollbar-thin max-[720px]:overflow-visible'>
				{tab === 'profile' && (
					<div className='flex animate-fade flex-col gap-[22px] pt-0.5 pb-2'>
						<div className={grid2}>
							<Field label='Фамилия'>
								<input
									className={inputClass}
									defaultValue='Касымова'
									autoComplete='family-name'
								/>
							</Field>
							<Field label='Имя'>
								<input
									className={inputClass}
									defaultValue='Айгерим'
									autoComplete='given-name'
								/>
							</Field>
							<Field label='Должность'>
								<input className={inputClass} defaultValue='Главный врач' />
							</Field>
							<Field label='Специализация'>
								<input
									className={inputClass}
									defaultValue='Стоматолог-терапевт, эндодонтист'
								/>
							</Field>
							<Field label='Телефон'>
								<input
									className={cn(inputClass, 'font-mono')}
									type='tel'
									defaultValue='+996 555 701 441'
								/>
							</Field>
							<Field label='Email'>
								<input
									className={inputClass}
									type='email'
									defaultValue='a.kasymova@denta.kg'
								/>
							</Field>
							<Field label='Номер диплома / сертификата'>
								<input
									className={cn(inputClass, 'font-mono')}
									defaultValue='КГМА 2014 · СТ-0912'
								/>
							</Field>
							<Field label='Кресло по умолчанию'>
								<select className={inputClass}>
									<option>Кресло 1 · Терапия</option>
									<option>Кресло 2 · Ортопедия</option>
								</select>
							</Field>
						</div>

						<div>
							<p className='mb-1 font-semibold'>Язык интерфейса</p>
							<p className='mb-2.5 text-[12.5px] leading-[18px] text-ink-muted'>
								Меняет язык меню и интерфейса для вас. Документы пациентам — по
								настройкам клиники.
							</p>
							<div
								role='radiogroup'
								aria-label='Язык интерфейса'
								className={grid3}
							>
								{INTERFACE_LANGUAGES.map(item => (
									<RadioCard
										key={item.id}
										code={item.code}
										title={item.name}
										note={item.note}
										checked={language === item.id}
										onSelect={() => setLanguage(item.id)}
									/>
								))}
							</div>
						</div>

						<div className={grid2}>
							<Field label='Тема'>
								<select
									className={inputClass}
									value={theme}
									onChange={event =>
										setTheme(event.target.value as ThemePreference)
									}
								>
									{THEMES.map(item => (
										<option key={item.id} value={item.id}>
											{item.label}
										</option>
									))}
								</select>
							</Field>
							<Field label='Вид расписания по умолчанию'>
								<select className={inputClass}>
									<option>Неделя</option>
									<option>День</option>
									<option>Месяц</option>
								</select>
							</Field>
							<Field label='Подпись в документах' className='col-span-full'>
								<textarea
									className={textareaClass}
									defaultValue='Касымова А. Б., главный врач, стоматолог-терапевт. Denta · Ала-Тоо, г. Бишкек.'
								/>
							</Field>
						</div>
					</div>
				)}

				{tab === 'security' && (
					<div className='flex animate-fade flex-col gap-[22px] pt-0.5 pb-2'>
						<div>
							<p className='mb-2.5 font-display text-[15px] leading-6 font-bold'>
								Смена пароля
							</p>
							<div className={grid3}>
								<Field label='Текущий пароль'>
									<input
										className={inputClass}
										type='password'
										defaultValue='••••••••••'
										autoComplete='current-password'
									/>
								</Field>
								<Field label='Новый пароль'>
									<input
										className={inputClass}
										type='password'
										placeholder='Минимум 10 символов'
										autoComplete='new-password'
									/>
								</Field>
								<Field label='Повторите пароль'>
									<input
										className={inputClass}
										type='password'
										placeholder='Ещё раз'
										autoComplete='new-password'
									/>
								</Field>
							</div>
							<p className='mt-2 text-[12.5px] leading-[18px] text-ink-muted'>
								Пароль меняли 64 дня назад. Рекомендуем менять каждые 90 дней.
							</p>
						</div>

						<div className='rounded-2xl border border-line px-3.5 py-1'>
							{SECURITY_OPTIONS.map(option => (
								<ToggleRow
									key={option.id}
									label={option.label}
									hint={option.hint}
									checked={prefs[option.id]}
									onChange={() => flip(option.id)}
								/>
							))}
						</div>

						<div>
							<div className='mb-1.5 flex flex-wrap items-center justify-between gap-2.5'>
								<p className='font-display text-[15px] leading-6 font-bold'>
									Активные сеансы
								</p>
								<Button
									size='sm'
									className='text-danger'
									onClick={() =>
										setEnded(
											SESSIONS.filter(s => s.id !== 'cur').map(s => s.id),
										)
									}
								>
									Завершить все, кроме текущего
								</Button>
							</div>
							<ul>
								{sessions.map(session => (
									<li
										key={session.id}
										className='flex items-center gap-3.5 border-b border-line py-3 last:border-b-0'
									>
										<span className='inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-sunken'>
											<Monitor size={18} aria-hidden='true' />
										</span>
										<div className='min-w-0 flex-grow'>
											<div className='flex items-center gap-2'>
												<span className='font-semibold'>{session.device}</span>
												{session.id === 'cur' && (
													<Badge tone='ok'>Этот сеанс</Badge>
												)}
											</div>
											<p className='text-[12.5px] leading-[18px] text-ink-muted'>
												{session.where}
											</p>
										</div>
										<span className='font-mono text-[12.5px] whitespace-nowrap text-ink-muted'>
											{session.when}
										</span>
										{session.id !== 'cur' && (
											<Button
												size='sm'
												onClick={() =>
													setEnded(current => [...current, session.id])
												}
											>
												Завершить
											</Button>
										)}
									</li>
								))}
							</ul>
						</div>
					</div>
				)}

				{tab === 'notifications' && (
					<div className='animate-fade pt-0.5 pb-2'>
						<div className='overflow-x-auto'>
							<Table className='min-w-[560px]' hoverRows={false}>
								<thead>
									<tr>
										<Th>Событие</Th>
										{NOTIFICATION_CHANNELS.map(channel => (
											<Th key={channel.id} align='center'>
												{channel.label}
											</Th>
										))}
									</tr>
								</thead>
								<tbody>
									{NOTIFICATION_EVENTS.map(event => (
										<tr key={event.id}>
											<Td>
												<div className='font-semibold'>{event.label}</div>
												<div className='text-[12.5px] leading-[18px] text-ink-muted'>
													{event.hint}
												</div>
											</Td>
											{NOTIFICATION_CHANNELS.map(channel => {
												const key = `${event.id}_${channel.id}`
												return (
													<Td key={channel.id} align='center'>
														<span className='inline-flex align-middle'>
															<Switch
																checked={prefs[key]}
																onChange={() => flip(key)}
																aria-label={`${event.label}: ${channel.aria}`}
															/>
														</span>
													</Td>
												)
											})}
										</tr>
									))}
								</tbody>
							</Table>
						</div>
						<div className={cn(grid2, 'mt-[18px]')}>
							<Field label='Не беспокоить'>
								<input
									className={cn(inputClass, 'font-mono')}
									defaultValue='21:00 – 07:30'
								/>
							</Field>
							<Field label='Сводка дня'>
								<select className={inputClass}>
									<option>В 07:45 · расписание на день</option>
									<option>Не присылать</option>
								</select>
							</Field>
						</div>
					</div>
				)}
			</div>

			<FormFooter
				saved={saved}
				savedLabel='✓ Профиль сохранён'
				onSave={() => setSaved(true)}
				onReset={() => {
					setPrefs(INITIAL_PREFERENCES)
					setSaved(false)
				}}
			/>
		</Card>
	)
}
