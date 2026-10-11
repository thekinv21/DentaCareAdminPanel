'use client'

import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import { toMinutes } from '@/entities/appointment'

import type { TWeekDay } from '@/shared/lib/date'
import { useFormat } from '@/shared/lib/i18n'

import { DAY_NAME } from './Clinic'
import type { TSettingsFormValues } from './SettingsForm'

/**
 * One day of the opening hours: its name, open state and length in hours
 */
export function useWorkDay(day: TWeekDay) {
	const t = useTranslations('Settings')
	const format = useFormat()
	const { control } = useFormContext<TSettingsFormValues>()
	const [isOpen, from, to] = useWatch({
		control,
		name: [`hours.${day}.open`, `hours.${day}.from`, `hours.${day}.to`],
	})
	const name = t(DAY_NAME[day])
	const lengthInHours = Math.max(0, toMinutes(to) - toMinutes(from)) / 60

	return {
		name,
		isOpen,
		length: t('hoursCount', { n: format.number(lengthInHours) }),
		labels: {
			open: t('workingDayOf', { day: name }),
			start: t('startOf', { day: name }),
			end: t('endOf', { day: name }),
		},
	}
}
