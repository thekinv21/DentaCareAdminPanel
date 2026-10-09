'use client'

import { useState } from 'react'

import { cn } from '@/shared/lib/cn'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { FormFooter } from '@/shared/ui/form-footer'

import {
	INITIAL_TOGGLES,
	type LanguageId,
	type SectionId,
	SECTIONS,
} from '../model/settings'
import {
	ClinicSection,
	HoursSection,
	LanguageSection,
	NotificationsSection,
	PaymentSection,
	ServicesSection,
} from './SettingsSections'

const BANKS = ['visa', 'mbank', 'komp', 'optima']

export function SettingsView() {
	const [section, setSection] = useState<SectionId>('pay')
	const [toggles, setToggles] = useState(INITIAL_TOGGLES)
	const [defaultLanguage, setDefaultLanguage] = useState<LanguageId>('ru')
	const [saved, setSaved] = useState(false)
	const [dirty, setDirty] = useState(false)

	const touch = () => {
		setSaved(false)
		setDirty(true)
	}
	const flip = (id: string) => {
		setToggles(current => ({ ...current, [id]: !current[id] }))
		touch()
	}

	const current = SECTIONS.find(item => item.id === section) ?? SECTIONS[0]
	const togglesProps = { toggles, flip }

	return (
		<div className='flex min-h-0 flex-auto animate-rise gap-4 max-[720px]:flex-col'>
			<Card
				as='aside'
				className='w-64 shrink-0 overflow-auto p-2.5 max-[720px]:w-auto'
			>
				<p className='px-3 pt-2 pb-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.06em] text-ink-subtle uppercase'>
					Разделы
				</p>
				<div
					role='tablist'
					aria-orientation='vertical'
					aria-label='Разделы настроек'
					className='flex flex-col gap-0.5'
				>
					{SECTIONS.map(item => {
						const selected = item.id === section
						const badge =
							item.id === 'pay'
								? BANKS.filter(bank => toggles[bank]).length
								: null
						return (
							<button
								key={item.id}
								type='button'
								role='tab'
								aria-selected={selected}
								onClick={() => {
									setSection(item.id)
									setSaved(false)
								}}
								className={cn(
									'flex min-h-[42px] items-center gap-2.5 rounded-xl border-0 px-3 py-1 text-left transition-colors duration-150',
									selected
										? 'bg-brand-soft font-semibold text-brand-strong'
										: 'bg-transparent font-medium text-ink-muted hover:bg-raised hover:text-ink',
								)}
							>
								<span className='min-w-0 flex-grow'>
									<span className='block truncate'>{item.label}</span>
									<span className='block truncate text-[12.5px] leading-[18px] font-normal text-ink-muted'>
										{item.hint}
									</span>
								</span>
								{badge !== null && (
									<span className='rounded-full bg-sunken px-[7px] font-mono text-[11px] leading-[18px] text-ink'>
										{badge}
									</span>
								)}
							</button>
						)
					})}
				</div>
			</Card>

			<Card
				as='section'
				className='min-h-0 min-w-0 flex-auto max-[720px]:flex-none'
			>
				<div className='flex flex-wrap items-center justify-between gap-2.5'>
					<div>
						<h2 className='font-display text-[17px] leading-6 font-bold tracking-[-0.01em]'>
							{current.label}
						</h2>
						<p className='text-[12.5px] leading-[18px] text-ink-muted'>
							{current.description}
						</p>
					</div>
					{section === 'services' && (
						<div className='flex gap-2'>
							<Button size='sm'>Импорт прайса</Button>
							<Button size='sm' variant='primary'>
								+ Услуга
							</Button>
						</div>
					)}
				</div>

				<div className='-mx-[18px] min-h-0 flex-auto overflow-auto px-[18px] scrollbar-thin max-[720px]:overflow-visible'>
					{section === 'clinic' && <ClinicSection />}
					{section === 'hours' && <HoursSection {...togglesProps} />}
					{section === 'services' && <ServicesSection />}
					{section === 'pay' && <PaymentSection {...togglesProps} />}
					{section === 'lang' && (
						<LanguageSection
							{...togglesProps}
							defaultLanguage={defaultLanguage}
							onDefaultLanguage={id => {
								setDefaultLanguage(id)
								touch()
							}}
						/>
					)}
					{section === 'notif' && <NotificationsSection {...togglesProps} />}
				</div>

				<FormFooter
					saved={saved}
					savedLabel='✓ Изменения сохранены'
					dirty={dirty}
					onSave={() => {
						setSaved(true)
						setDirty(false)
					}}
					onReset={() => {
						setToggles(INITIAL_TOGGLES)
						setDefaultLanguage('ru')
						setSaved(false)
						setDirty(false)
					}}
				/>
			</Card>
		</div>
	)
}
