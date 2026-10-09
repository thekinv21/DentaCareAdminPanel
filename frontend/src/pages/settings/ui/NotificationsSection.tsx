'use client'

import { useI18n } from '@/shared/lib/i18n'
import { Badge } from '@/shared/ui/badge'
import { Field, formGrid2, textareaClass } from '@/shared/ui/field'
import { ToggleRow } from '@/shared/ui/toggle-row'

import { NOTIFICATIONS } from '../model/communication'
import type { TogglesProps } from '../model/use-settings'

const TEMPLATE_RU =
	'Здравствуйте, {имя}! Напоминаем о записи в Denta {дата} в {время}. Врач: {врач}. Ответьте 1 — подтвердить, 2 — перенести.'
const TEMPLATE_KY =
	'Саламатсызбы, {аты}! Denta клиникасына {күнү} саат {убакыт} жазылууңузду эскертебиз. Дарыгер: {дарыгер}.'

export function NotificationsSection({ toggles, flip }: TogglesProps) {
	const { t } = useI18n()
	return (
		<div className='flex animate-fade flex-col gap-[18px] pb-2'>
			<div>
				{NOTIFICATIONS.map(item => (
					<ToggleRow
						key={item.id}
						label={t(item.label)}
						hint={t(item.hint)}
						meta={<Badge>{t(item.channel)}</Badge>}
						checked={toggles[item.id]}
						onChange={() => flip(item.id)}
					/>
				))}
			</div>
			<div className={formGrid2}>
				<Field label={t('Шаблон напоминания · RU')}>
					<textarea className={textareaClass} defaultValue={TEMPLATE_RU} />
				</Field>
				<Field label={t('Шаблон напоминания · KY')}>
					<textarea className={textareaClass} defaultValue={TEMPLATE_KY} />
				</Field>
			</div>
			<p className='text-[12.5px] leading-[18px] text-ink-muted'>
				{t('SMS-шлюз: Nikita.kg · баланс')}{' '}
				<span className='font-mono font-semibold text-ink'>
					{t('4 280 сом')}
				</span>{' '}
				{t('· ≈ 3 560 сообщений')}
			</p>
		</div>
	)
}
