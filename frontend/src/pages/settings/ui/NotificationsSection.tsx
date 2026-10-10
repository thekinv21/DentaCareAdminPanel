'use client'

import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import { translateOptional } from '@/shared/lib/i18n'
import { Badge } from '@/shared/ui/badge'
import { Field, formGrid2, textareaClass } from '@/shared/ui/field'
import { ToggleRow } from '@/shared/ui/toggle-row'

import { NOTIFICATIONS } from '../model/Communication'
import type { TSettingsFormValues } from '../model/SettingsForm'

export function NotificationsSection() {
	const t = useTranslations('Settings')
	const { control, register } = useFormContext<TSettingsFormValues>()

	return (
		<div className='flex animate-fade flex-col gap-4.5 pb-2'>
			<div>
				{NOTIFICATIONS.map(item => (
					<Controller
						key={item.id}
						control={control}
						name={`toggles.${item.id}`}
						render={({ field }) => (
							<ToggleRow
								label={t(item.label)}
								hint={t(item.hint)}
								meta={<Badge>{translateOptional(t, item.channel)}</Badge>}
								checked={field.value}
								onChange={field.onChange}
							/>
						)}
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
				{t('smsGatewayNikitaKg')}{' '}
				<span className='font-mono font-semibold text-ink'>
					{t('n4280Som')}
				</span>{' '}
				{t('n3560Messages')}
			</p>
		</div>
	)
}
