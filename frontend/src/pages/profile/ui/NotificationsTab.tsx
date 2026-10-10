'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/shared/lib/cn'
import { Field, formGrid2, inputClass } from '@/shared/ui/field'
import { Table, Th } from '@/shared/ui/table'

import type { TProfileFormValues } from '../model/ProfileFormSchema'
import type { TProfileSettingsModel } from '../model/useProfileSettings'
import { NotificationEventRow } from './NotificationEventRow'

type TNotificationsTabProps = { settings: TProfileSettingsModel }

export function NotificationsTab({ settings }: TNotificationsTabProps) {
	const t = useTranslations('Profile')

	const { register } = useFormContext<TProfileFormValues>()

	return (
		<div className='animate-fade pt-0.5 pb-2'>
			<div className='overflow-x-auto'>
				<Table className='min-w-140' hoverRows={false}>
					<thead>
						<tr>
							<Th>{t('event')}</Th>
							{settings.channels.map(channel => (
								<Th key={channel.id} align='center'>
									{channel.label}
								</Th>
							))}
						</tr>
					</thead>
					<tbody>
						{settings.events.map(event => (
							<NotificationEventRow key={event.id} event={event} />
						))}
					</tbody>
				</Table>
			</div>
			<div className={cn(formGrid2, 'mt-4.5')}>
				<Field label={t('doNotDisturb')}>
					<input
						className={cn(inputClass, 'font-mono')}
						{...register('doNotDisturb')}
					/>
				</Field>
				<Field label={t('daySummary')}>
					<select className={inputClass} {...register('daySummary')}>
						<option value='daily'>{settings.dailyScheduleLabel}</option>
						<option value='never'>{t('dontSend')}</option>
					</select>
				</Field>
			</div>
		</div>
	)
}
