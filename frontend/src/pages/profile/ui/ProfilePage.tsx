'use client'

import { useTranslations } from 'next-intl'
import { FormProvider } from 'react-hook-form'

import { PageContent, PageHeader } from '@/widgets/page-header'

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

	const {
		crumb,
		tab,
		tabs,
		onTabChange,
		languages,
		theme,
		themes,
		onThemeChange,
		passwordHint,
		dailyScheduleLabel,
		security,
		sessions,
		onEndOtherSessions,
		channels,
		events,
	} = useProfileSettings()

	const { form, saved, dirty, saving, onSubmit, onReset } = useProfileForm()

	return (
		<>
			<PageHeader crumb={crumb} title={t('myProfile')} />
			<PageContent>
				<FormProvider {...form}>
					<div className='flex min-h-0 flex-auto animate-rise gap-4 max-mobile:flex-col'>
						<ProfileSummary />
						<form noValidate onSubmit={onSubmit} className='contents'>
							<Card
								as='section'
								className='min-h-0 min-w-0 flex-auto max-mobile:flex-none'
							>
								<div className='flex flex-wrap items-center justify-between gap-2.5'>
									<Segmented
										aria-label={t('profileSection')}
										options={tabs}
										value={tab}
										onChange={onTabChange}
									/>
									<p className='text-[12.5px] leading-4.5 text-ink-muted'>
										{t('lastSignInToday')}
									</p>
								</div>
								<div className='-mx-4.5 min-h-0 flex-auto overflow-auto px-4.5 scrollbar-thin max-mobile:overflow-visible'>
									{tab === 'profile' && (
										<ProfileTab
											languages={languages}
											theme={theme}
											themes={themes}
											onThemeChange={onThemeChange}
										/>
									)}
									{tab === 'security' && (
										<SecurityTab
											passwordHint={passwordHint}
											security={security}
											sessions={sessions}
											onEndOtherSessions={onEndOtherSessions}
										/>
									)}
									{tab === 'notifications' && (
										<NotificationsTab
											channels={channels}
											events={events}
											dailyScheduleLabel={dailyScheduleLabel}
										/>
									)}
								</div>
								<FormFooter
									saved={saved}
									savedLabel={t('profileSaved')}
									dirty={dirty}
									saving={saving}
									onReset={onReset}
								/>
							</Card>
						</form>
					</div>
				</FormProvider>
			</PageContent>
		</>
	)
}
