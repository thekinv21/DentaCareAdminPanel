'use client'

import { cn } from '@/shared/lib/cn'
import { useI18n } from '@/shared/lib/i18n'
import { Badge } from '@/shared/ui/badge'
import { Field, formGrid3, inputClass } from '@/shared/ui/field'
import { Switch } from '@/shared/ui/switch'

import { WORK_DAYS } from '../model/clinic'
import type { TogglesProps } from '../model/use-settings'

const timeClass = cn(inputClass, 'w-[120px] font-mono')

export function HoursSection({ toggles, flip }: TogglesProps) {
	const { t } = useI18n()
	return (
		<div className='animate-fade pb-2'>
			<div className={cn(formGrid3, 'mb-2')}>
				<Field label={t('Шаг записи')}>
					<select className={inputClass}>
						<option>{t('15 минут')}</option>
						<option>{t('30 минут')}</option>
					</select>
				</Field>
				<Field label={t('Обед')}>
					<input
						className={cn(inputClass, 'font-mono')}
						defaultValue='13:00 – 14:00'
					/>
				</Field>
				<Field label={t('Запись онлайн')}>
					<select className={inputClass}>
						<option>{t('За 30 дней вперёд')}</option>
						<option>{t('За 14 дней')}</option>
					</select>
				</Field>
			</div>
			<ul>
				{WORK_DAYS.map(day => {
					const name = t(day.name)
					return (
						<li
							key={day.id}
							className='flex flex-wrap items-center gap-3.5 border-b border-line py-3 last:border-b-0'
						>
							<Switch
								checked={toggles[day.id]}
								onChange={() => flip(day.id)}
								aria-label={`${name}${t(': рабочий день')}`}
							/>
							<span className='w-[130px] font-semibold'>{name}</span>
							{toggles[day.id] ? (
								<>
									<span className='flex items-center gap-2'>
										<input
											type='time'
											className={timeClass}
											defaultValue={day.from}
											aria-label={`${name}${t(': начало')}`}
										/>
										<span className='text-ink-muted'>—</span>
										<input
											type='time'
											className={timeClass}
											defaultValue={day.to}
											aria-label={`${name}${t(': конец')}`}
										/>
									</span>
									<span className='ml-auto text-[12.5px] text-ink-muted'>
										{parseInt(day.to) - parseInt(day.from)} {t('ч')}
									</span>
								</>
							) : (
								<Badge>{t('Выходной')}</Badge>
							)}
						</li>
					)
				})}
			</ul>
		</div>
	)
}
