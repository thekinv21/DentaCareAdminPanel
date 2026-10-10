'use client'

import type { ComponentType } from 'react'

import { useTranslations } from 'next-intl'
import { FormProvider } from 'react-hook-form'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { Card } from '@/shared/ui/card'
import { FormFooter } from '@/shared/ui/form-footer'

import type { TSectionId } from '../model/Sections'
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
import { SETTINGS_PANEL_ID, SettingsNav } from './SettingsNav'
import { SettingsSectionHeader } from './SettingsSectionHeader'

/**
 * Sections that only edit the settings form; "services" also needs the price list
 */
const FORM_SECTION: Record<Exclude<TSectionId, 'services'>, ComponentType> = {
	clinic: ClinicSection,
	hours: HoursSection,
	payment: PaymentSection,
	languages: LanguageSection,
	notifications: NotificationsSection,
}

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
	const FormSection = section === 'services' ? null : FORM_SECTION[section]

	return (
		<>
			<PageHeader crumb={t('clinicBishkekAlaToo')} title={t('settings')} />
			<PageContent>
				<div className='flex min-h-0 flex-auto animate-rise gap-4 max-mobile:flex-col'>
					<SettingsNav
						sections={settings.sections}
						selectSection={settings.selectSection}
					/>
					<FormProvider {...settings.methods}>
						<form noValidate onSubmit={settings.submit} className='contents'>
							<Card
								as='section'
								id={SETTINGS_PANEL_ID}
								role='tabpanel'
								aria-labelledby={`settings-tab-${section}`}
								className='min-h-0 min-w-0 flex-auto max-mobile:flex-none'
							>
								<SettingsSectionHeader
									current={settings.current}
									onAddService={
										section === 'services' ? serviceForm.openCreate : undefined
									}
								/>
								<div className='-mx-4.5 min-h-0 flex-auto overflow-auto px-4.5 scrollbar-thin max-mobile:overflow-visible'>
									{FormSection ? (
										<FormSection />
									) : (
										<ServicesSection services={services} />
									)}
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
