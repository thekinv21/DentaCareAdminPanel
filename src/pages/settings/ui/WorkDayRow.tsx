'use client'

import { useTranslations } from 'next-intl'
import { useController, useFormContext } from 'react-hook-form'

import { cn } from '@/shared/lib/cn'
import type { TWeekDay } from '@/shared/lib/date'
import { Badge } from '@/shared/ui/badge'
import { inputClass } from '@/shared/ui/field'
import { Switch } from '@/shared/ui/switch'

import type { TSettingsFormValues } from '../model/SettingsForm'
import { useWorkDay } from '../model/useWorkDay'

const timeInputClass = cn(inputClass, 'w-30 font-mono')

type TWorkDayRowProps = { day: TWeekDay }

/**
 * Open switch and opening hours of one week day; it watches only its own day
 */
export function WorkDayRow({ day }: TWorkDayRowProps) {
	const t = useTranslations('Settings')
	const { control, register } = useFormContext<TSettingsFormValues>()
	const { field } = useController({ control, name: `hours.${day}.open` })
	const workDay = useWorkDay(day)

	return (
		<li className='flex flex-wrap items-center gap-3.5 border-b border-line py-3 last:border-b-0'>
			<Switch
				checked={field.value}
				onChange={field.onChange}
				aria-label={workDay.labels.open}
			/>
			<span className='w-32.5 font-semibold'>{workDay.name}</span>
			{workDay.isOpen ? (
				<>
					<span className='flex items-center gap-2'>
						<input
							type='time'
							className={timeInputClass}
							aria-label={workDay.labels.start}
							{...register(`hours.${day}.from`)}
						/>
						<span className='text-ink-muted'>—</span>
						<input
							type='time'
							className={timeInputClass}
							aria-label={workDay.labels.end}
							{...register(`hours.${day}.to`)}
						/>
					</span>
					<span className='ml-auto text-[12.5px] text-ink-muted'>
						{workDay.length}
					</span>
				</>
			) : (
				<Badge>{t('dayOff')}</Badge>
			)}
		</li>
	)
}
