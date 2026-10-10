'use client'

import { useTranslations } from 'next-intl'
import { FormProvider } from 'react-hook-form'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { useCurrentUser } from '@/entities/employee'

import { Card } from '@/shared/ui/card'
import { FormFooter } from '@/shared/ui/form-footer'
import { Segmented } from '@/shared/ui/segmented'

import { useProfileForm } from '../model/useProfileForm'
import { useProfileSettings } from '../model/useProfileSettings'
import { NotificationsTab } from './NotificationsTab'
import { ProfileSummary } from './ProfileSummary'
import { ProfileTab } from './ProfileTab'
import { SecurityTab } from './SecurityTab'

export function ProfilePage() {
	const t = useTranslations('Profile')
	const user = useCurrentUser()
	const settings = useProfileSettings()
	const form = useProfileForm()

	return (
		<>
			<PageHeader
				crumb={`${t('account')} · ${user.fullName}`}
				title={t('myProfile')}
			/>
			<PageContent>
				<div className='flex min-h-0 flex-auto animate-rise gap-4 max-mobile:flex-col'>
					<ProfileSummary />
					<FormProvider {...form.methods}>
						<form noValidate onSubmit={form.submit} className='contents'>
							<Card
								as='section'
								className='min-h-0 min-w-0 flex-auto max-mobile:flex-none'
							>
								<div className='flex flex-wrap items-center justify-between gap-2.5'>
									<Segmented
										aria-label={t('profileSection')}
										options={settings.tabs}
										value={settings.tab}
										onChange={settings.selectTab}
									/>
									<p className='text-[12.5px] leading-4.5 text-ink-muted'>
										{t('lastSignInToday')}
									</p>
								</div>
								<div className='-mx-4.5 min-h-0 flex-auto overflow-auto px-4.5 scrollbar-thin max-mobile:overflow-visible'>
									{settings.tab === 'profile' && (
										<ProfileTab settings={settings} />
									)}
									{settings.tab === 'security' && (
										<SecurityTab settings={settings} />
									)}
									{settings.tab === 'notifications' && (
										<NotificationsTab settings={settings} />
									)}
								</div>
								<FormFooter
									saved={form.saved}
									savedLabel={t('profileSaved')}
									dirty={form.dirty}
									saving={form.saving}
									onReset={form.reset}
								/>
							</Card>
						</form>
					</FormProvider>
				</div>
			</PageContent>
		</>
	)
}
