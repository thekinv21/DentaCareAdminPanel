'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { Badge } from '@/shared/ui/badge'
import { Field, formGrid3, inputClass } from '@/shared/ui/field'
import { Switch } from '@/shared/ui/switch'

import { WORK_DAYS } from '../model/Clinic'
import type { SettingsModel } from '../model/useSettings'

const timeClass = cn(inputClass, 'w-30 font-mono')

type THoursSectionProps = Pick<SettingsModel, 'toggles' | 'flip'>

export function HoursSection({ toggles, flip }: THoursSectionProps) {
	const t = useTranslations('Settings')
	return (
		<div className='animate-fade pb-2'>
			<div className={cn(formGrid3, 'mb-2')}>
				<Field label={t('slotInterval')}>
					<select className={inputClass}>
						<option>{t('n15Minutes')}</option>
						<option>{t('n30Minutes')}</option>
					</select>
				</Field>
				<Field label={t('lunch')}>
					<input
						className={cn(inputClass, 'font-mono')}
						defaultValue='13:00 – 14:00'
					/>
				</Field>
				<Field label={t('onlineBooking')}>
					<select className={inputClass}>
						<option>{t('next30Days')}</option>
						<option>{t('last14Days')}</option>
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
								aria-label={`${name}${t('workingDay')}`}
							/>
							<span className='w-32.5 font-semibold'>{name}</span>
							{toggles[day.id] ? (
								<>
									<span className='flex items-center gap-2'>
										<input
											type='time'
											className={timeClass}
											defaultValue={day.from}
											aria-label={`${name}${t('start')}`}
										/>
										<span className='text-ink-muted'>—</span>
										<input
											type='time'
											className={timeClass}
											defaultValue={day.to}
											aria-label={`${name}${t('end')}`}
										/>
									</span>
									<span className='ml-auto text-[12.5px] text-ink-muted'>
										{parseInt(day.to) - parseInt(day.from)} {t('h')}
									</span>
								</>
							) : (
								<Badge>{t('dayOff')}</Badge>
							)}
						</li>
					)
				})}
			</ul>
		</div>
	)
}
