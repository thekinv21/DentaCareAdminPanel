'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { translateOptional, useFormat } from '@/shared/lib/i18n'
import { Badge } from '@/shared/ui/badge'
import { Field, formGrid2, textareaClass } from '@/shared/ui/field'
import { ToggleRowField } from '@/shared/ui/toggle-row'

import { NOTIFICATIONS, SMS_GATEWAY_BALANCE } from '../model/Communication'
import type { TSettingsFormValues } from '../model/SettingsForm'

export function NotificationsSection() {
	const t = useTranslations('Settings')
	const format = useFormat()
	const { control, register } = useFormContext<TSettingsFormValues>()

	return (
		<div className='flex animate-fade flex-col gap-4.5 pb-2'>
			<div>
				{NOTIFICATIONS.map(notification => (
					<ToggleRowField
						key={notification.id}
						control={control}
						name={`notifications.${notification.id}`}
						label={t(notification.label)}
						hint={t(notification.hint)}
						meta={<Badge>{translateOptional(t, notification.channel)}</Badge>}
					/>
				))}
			</div>
			<div className={formGrid2}>
				<Field label={t('reminderTemplateRu')}>
					<textarea className={textareaClass} {...register('templates.ru')} />
				</Field>
				<Field label={t('reminderTemplateKy')}>
					<textarea className={textareaClass} {...register('templates.ky')} />
				</Field>
			</div>
			<p className='text-[12.5px] leading-4.5 text-ink-muted'>
				{t('smsBalance', {
					amount: format.som(SMS_GATEWAY_BALANCE.amount),
					n: format.number(SMS_GATEWAY_BALANCE.messagesLeft),
				})}
			</p>
		</div>
	)
}
