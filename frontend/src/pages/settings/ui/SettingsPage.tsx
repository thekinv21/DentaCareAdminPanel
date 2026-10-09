'use client'

import { useTranslations } from 'next-intl'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { FormFooter } from '@/shared/ui/form-footer'

import { useSettings } from '../model/useSettings'
import { ClinicSection } from './ClinicSection'
import { HoursSection } from './HoursSection'
import { LanguageSection } from './LanguageSection'
import { NotificationsSection } from './NotificationsSection'
import { PaymentSection } from './PaymentSection'
import { ServicesSection } from './ServicesSection'
import { SettingsNav } from './SettingsNav'

export function SettingsPage() {
	const t = useTranslations('Settings')
	const settings = useSettings()
	const { section } = settings

	return (
		<>
			<PageHeader crumb={t('clinicBishkekAlaToo')} title={t('settings')} />
			<PageContent>
				<div className='flex min-h-0 flex-auto animate-rise gap-4 max-[720px]:flex-col'>
					<SettingsNav
						sections={settings.sections}
						selectSection={settings.selectSection}
					/>
					<Card
						as='section'
						className='min-h-0 min-w-0 flex-auto max-[720px]:flex-none'
					>
						<div className='flex flex-wrap items-center justify-between gap-2.5'>
							<div>
								<h2 className='font-display text-[17px] leading-6 font-bold tracking-[-0.01em]'>
									{settings.current.label}
								</h2>
								<p className='text-[12.5px] leading-4.5 text-ink-muted'>
									{settings.current.description}
								</p>
							</div>
							{section === 'services' && (
								<div className='flex gap-2'>
									<Button size='sm'>{t('importPriceList')}</Button>
									<Button size='sm' variant='primary'>
										{t('addService')}
									</Button>
								</div>
							)}
						</div>
						<div className='-mx-4.5 min-h-0 flex-auto overflow-auto px-4.5 scrollbar-thin max-[720px]:overflow-visible'>
							{section === 'clinic' && <ClinicSection />}
							{section === 'hours' && <HoursSection {...settings} />}
							{section === 'services' && <ServicesSection />}
							{section === 'pay' && <PaymentSection {...settings} />}
							{section === 'lang' && <LanguageSection {...settings} />}
							{section === 'notif' && <NotificationsSection {...settings} />}
						</div>
						<FormFooter
							saved={settings.saved}
							savedLabel={t('changesSaved')}
							dirty={settings.dirty}
							onSave={settings.save}
							onReset={settings.reset}
						/>
					</Card>
				</div>
			</PageContent>
		</>
	)
}
