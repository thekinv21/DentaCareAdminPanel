'use client'

import { useTranslations } from 'next-intl'
import { FormProvider } from 'react-hook-form'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { FormFooter } from '@/shared/ui/form-footer'

import { useServiceForm } from '../model/useServiceForm'
import { useServiceRemoval } from '../model/useServiceRemoval'
import { useServices } from '../model/useServices'
import { useSettings } from '../model/useSettings'
import { ClinicSection } from './ClinicSection'
import { HoursSection } from './HoursSection'
import { LanguageSection } from './LanguageSection'
import { NotificationsSection } from './NotificationsSection'
import { PaymentSection } from './PaymentSection'
import { ServiceFormModal } from './ServiceFormModal'
import { ServicesSection } from './ServicesSection'
import { SettingsNav } from './SettingsNav'

export function SettingsPage() {
	const t = useTranslations('Settings')
	const settings = useSettings()
	const removal = useServiceRemoval()
	const serviceForm = useServiceForm(removal.remove)
	const services = useServices({
		removedCodes: removal.removedCodes,
		onEdit: serviceForm.openEdit,
		onRemove: removal.remove,
	})
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
					<FormProvider {...settings.methods}>
						<form noValidate onSubmit={settings.submit} className='contents'>
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
											<Button
												size='sm'
												variant='primary'
												onClick={serviceForm.openCreate}
											>
												{t('addService')}
											</Button>
										</div>
									)}
								</div>
								<div className='-mx-4.5 min-h-0 flex-auto overflow-auto px-4.5 scrollbar-thin max-[720px]:overflow-visible'>
									{section === 'clinic' && <ClinicSection />}
									{section === 'hours' && <HoursSection />}
									{section === 'services' && (
										<ServicesSection services={services} />
									)}
									{section === 'pay' && <PaymentSection />}
									{section === 'lang' && <LanguageSection />}
									{section === 'notif' && <NotificationsSection />}
								</div>
								<FormFooter
									saved={settings.saved}
									savedLabel={t('changesSaved')}
									dirty={settings.dirty}
									saving={settings.saving}
									onReset={settings.reset}
								/>
							</Card>
						</form>
					</FormProvider>
				</div>
			</PageContent>
			<ServiceFormModal form={serviceForm} />
		</>
	)
}
