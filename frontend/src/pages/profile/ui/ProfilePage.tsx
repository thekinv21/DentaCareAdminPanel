import type { Metadata } from 'next'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { CURRENT_USER } from '@/entities/employee'

import { ProfileSettings } from './ProfileSettings'
import { ProfileSummary } from './ProfileSummary'

export const metadata: Metadata = { title: 'Мой профиль' }

export function ProfilePage() {
	return (
		<>
			<PageHeader
				crumb={`Учётная запись · ${CURRENT_USER.fullName}`}
				title='Мой профиль'
			/>
			<PageContent>
				<div className='flex min-h-0 flex-auto animate-rise gap-4 max-[720px]:flex-col'>
					<ProfileSummary />
					<ProfileSettings />
				</div>
			</PageContent>
		</>
	)
}
