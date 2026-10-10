'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/shared/ui/button'
import { ToggleRowField } from '@/shared/ui/toggle-row'

import type { TProfileFormValues } from '../model/ProfileFormSchema'
import type { TProfileSettingsModel } from '../model/useProfileSettings'
import { PasswordChangeFields } from './PasswordChangeFields'
import { SessionRow } from './SessionRow'

type TSecurityTabProps = {
	passwordHint: string
	security: TProfileSettingsModel['security']
	sessions: TProfileSettingsModel['sessions']
	onEndOtherSessions: () => void
}

export function SecurityTab(props: TSecurityTabProps) {
	const { passwordHint, security, sessions, onEndOtherSessions } = props

	const t = useTranslations('Profile')

	const { control } = useFormContext<TProfileFormValues>()

	return (
		<div className='flex animate-fade flex-col gap-5.5 pt-0.5 pb-2'>
			<PasswordChangeFields hint={passwordHint} />

			<div className='rounded-2xl border border-line px-3.5 py-1'>
				{security.map(option => (
					<ToggleRowField
						key={option.id}
						control={control}
						name={`security.${option.id}`}
						label={option.label}
						hint={option.hint}
					/>
				))}
			</div>

			<div>
				<div className='mb-1.5 flex flex-wrap items-center justify-between gap-2.5'>
					<p className='font-display text-[15px] leading-6 font-bold'>
						{t('activeSessions')}
					</p>
					<Button
						size='sm'
						className='text-danger'
						onClick={onEndOtherSessions}
					>
						{t('endAllExceptCurrent')}
					</Button>
				</div>
				<ul>
					{sessions.map(session => (
						<SessionRow key={session.id} session={session} />
					))}
				</ul>
			</div>
		</div>
	)
}
