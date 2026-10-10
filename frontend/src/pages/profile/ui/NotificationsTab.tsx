'use client'

import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import { cn } from '@/shared/lib/cn'
import { Field, formGrid2, inputClass } from '@/shared/ui/field'
import { Switch } from '@/shared/ui/switch'
import { Table, Td, Th } from '@/shared/ui/table'

import type { TProfileFormValues } from '../model/ProfileForm'
import type { TProfileSettingsModel } from '../model/useProfileSettings'

type TNotificationsTabProps = { model: TProfileSettingsModel }

export function NotificationsTab({ model }: TNotificationsTabProps) {
	const t = useTranslations('Profile')
	const { control, register } = useFormContext<TProfileFormValues>()

	return (
		<div className='animate-fade pt-0.5 pb-2'>
			<div className='overflow-x-auto'>
				<Table className='min-w-140' hoverRows={false}>
					<thead>
						<tr>
							<Th>{t('event')}</Th>
							{model.channels.map(channel => (
								<Th key={channel.id} align='center'>
									{channel.label}
								</Th>
							))}
						</tr>
					</thead>
					<tbody>
						{model.events.map(event => (
							<tr key={event.id}>
								<Td>
									<div className='font-semibold'>{event.label}</div>
									<div className='text-[12.5px] leading-4.5 text-ink-muted'>
										{event.hint}
									</div>
								</Td>
								{event.channels.map(channel => (
									<Td key={channel.id} align='center'>
										<span className='inline-flex align-middle'>
											<Controller
												control={control}
												name={`prefs.${channel.pref}`}
												render={({ field }) => (
													<Switch
														checked={field.value}
														onChange={field.onChange}
														aria-label={channel.aria}
													/>
												)}
											/>
										</span>
									</Td>
								))}
							</tr>
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
						<option value='daily'>{t('at0745Daily')}</option>
						<option value='never'>{t('dontSend')}</option>
					</select>
				</Field>
			</div>
		</div>
	)
}
