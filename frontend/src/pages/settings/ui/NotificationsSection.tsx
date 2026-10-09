'use client'

import { useTranslations } from 'next-intl'

import { translateOptional } from '@/shared/lib/i18n'
import { Badge } from '@/shared/ui/badge'
import { Field, formGrid2, textareaClass } from '@/shared/ui/field'
import { ToggleRow } from '@/shared/ui/toggle-row'

import { NOTIFICATIONS } from '../model/Communication'
import type { SettingsModel } from '../model/useSettings'

const TEMPLATE_RU =
	'Здравствуйте, {имя}! Напоминаем о записи в Denta {дата} в {время}. Врач: {врач}. Ответьте 1 — подтвердить, 2 — перенести.'
const TEMPLATE_KY =
	'Саламатсызбы, {аты}! Denta клиникасына {күнү} саат {убакыт} жазылууңузду эскертебиз. Дарыгер: {дарыгер}.'

type TNotificationsSectionProps = Pick<SettingsModel, 'toggles' | 'flip'>

export function NotificationsSection({
	toggles,
	flip,
}: TNotificationsSectionProps) {
	const t = useTranslations('Settings')
	return (
		<div className='flex animate-fade flex-col gap-4.5 pb-2'>
			<div>
				{NOTIFICATIONS.map(item => (
					<ToggleRow
						key={item.id}
						label={t(item.label)}
						hint={t(item.hint)}
						meta={<Badge>{translateOptional(t, item.channel)}</Badge>}
						checked={toggles[item.id]}
						onChange={() => flip(item.id)}
					/>
				))}
			</div>
			<div className={formGrid2}>
				<Field label={t('reminderTemplateRu')}>
					<textarea className={textareaClass} defaultValue={TEMPLATE_RU} />
				</Field>
				<Field label={t('reminderTemplateKy')}>
					<textarea className={textareaClass} defaultValue={TEMPLATE_KY} />
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
