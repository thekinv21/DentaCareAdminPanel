'use client'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { CURRENT_USER } from '@/entities/employee'

import { useI18n } from '@/shared/lib/i18n'
import { Card } from '@/shared/ui/card'
import { FormFooter } from '@/shared/ui/form-footer'
import { Segmented } from '@/shared/ui/segmented'

import { useProfileSettings } from '../model/use-profile-settings'
import { NotificationsTab } from './NotificationsTab'
import { ProfileSummary } from './ProfileSummary'
import { ProfileTab } from './ProfileTab'
import { SecurityTab } from './SecurityTab'

export function ProfilePage() {
	const { t, format } = useI18n()
	const model = useProfileSettings()

	return (
		<>
			<PageHeader
				crumb={`${t('Учётная запись')} · ${format.name(CURRENT_USER.fullName)}`}
				title={t('Мой профиль')}
			/>
			<PageContent>
				<div className='flex min-h-0 flex-auto animate-rise gap-4 max-[720px]:flex-col'>
					<ProfileSummary />
					<Card
						as='section'
						className='min-h-0 min-w-0 flex-auto max-[720px]:flex-none'
					>
						<div className='flex flex-wrap items-center justify-between gap-2.5'>
							<Segmented
								aria-label={t('Раздел профиля')}
								options={model.tabs}
								value={model.tab}
								onChange={model.selectTab}
							/>
							<p className='text-[12.5px] leading-[18px] text-ink-muted'>
								{t('Последний вход: сегодня, 08:24 · Chrome, Windows')}
							</p>
						</div>
						<div className='-mx-[18px] min-h-0 flex-auto overflow-auto px-[18px] scrollbar-thin max-[720px]:overflow-visible'>
							{model.tab === 'profile' && <ProfileTab model={model} />}
							{model.tab === 'security' && <SecurityTab model={model} />}
							{model.tab === 'notifications' && (
								<NotificationsTab model={model} />
							)}
						</div>
						<FormFooter
							saved={model.saved}
							savedLabel={t('✓ Профиль сохранён')}
							onSave={model.save}
							onReset={model.reset}
						/>
					</Card>
				</div>
			</PageContent>
		</>
	)
}
