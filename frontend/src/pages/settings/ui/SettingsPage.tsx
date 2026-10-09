'use client'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { useI18n } from '@/shared/lib/i18n'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { FormFooter } from '@/shared/ui/form-footer'

import { useSettings } from '../model/use-settings'
import { ClinicSection } from './ClinicSection'
import { HoursSection } from './HoursSection'
import { LanguageSection } from './LanguageSection'
import { NotificationsSection } from './NotificationsSection'
import { PaymentSection } from './PaymentSection'
import { ServicesSection } from './ServicesSection'
import { SettingsNav } from './SettingsNav'

export function SettingsPage() {
	const { t } = useI18n()
	const settings = useSettings()
	const { section } = settings

	return (
		<>
			<PageHeader
				crumb={t('Клиника · Бишкек, Ала-Тоо')}
				title={t('Настройки')}
			/>
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
								<p className='text-[12.5px] leading-[18px] text-ink-muted'>
									{settings.current.description}
								</p>
							</div>
							{section === 'services' && (
								<div className='flex gap-2'>
									<Button size='sm'>{t('Импорт прайса')}</Button>
									<Button size='sm' variant='primary'>
										{t('+ Услуга')}
									</Button>
								</div>
							)}
						</div>
						<div className='-mx-[18px] min-h-0 flex-auto overflow-auto px-[18px] scrollbar-thin max-[720px]:overflow-visible'>
							{section === 'clinic' && <ClinicSection />}
							{section === 'hours' && <HoursSection {...settings} />}
							{section === 'services' && <ServicesSection />}
							{section === 'pay' && <PaymentSection {...settings} />}
							{section === 'lang' && <LanguageSection {...settings} />}
							{section === 'notif' && <NotificationsSection {...settings} />}
						</div>
						<FormFooter
							saved={settings.saved}
							savedLabel={t('✓ Изменения сохранены')}
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
