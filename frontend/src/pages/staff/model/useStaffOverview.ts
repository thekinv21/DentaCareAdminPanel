'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import {
	STAFF,
	STAFF_ROLE,
	STAFF_STATUS,
	type TStaffRole,
} from '@/entities/employee'

import { addDays } from '@/shared/lib/date'
import { getInitials } from '@/shared/lib/format'
import { translateOptional, useFormat } from '@/shared/lib/i18n'

import {
	ROSTER,
	SHIFT_KIND,
	TODAY_COLUMN,
	type TRosterShift,
	WEEK_NUMBER,
	WEEK_START,
	WORK_DAYS_SHOWN,
} from './Roster'
import type { TShiftTarget } from './useShiftForm'

type TStaffView = 'team' | 'roster'
type TRoleFilter = 'all' | TStaffRole

/**
 * Query of the team list
 */
type TTeamQuery = { role: TRoleFilter }

const ROLE_FILTERS: { id: TRoleFilter; label: string }[] = [
	{ id: 'all', label: 'all' },
	{ id: 'dentist', label: 'dentists' },
	{ id: 'assistant', label: 'assistants' },
	{ id: 'reception', label: 'administrators' },
]

const WEEK_DAY_ISOS = Array.from({ length: WORK_DAYS_SHOWN }, (_, offset) =>
	addDays(WEEK_START, offset),
)

/**
 * Team list filtered by role and the weekly shift roster
 */
export function useStaffOverview(onPickShift: (target: TShiftTarget) => void) {
	const t = useTranslations('Staff')
	const tEmployee = useTranslations('Employee')
	const format = useFormat()
	const [view, setView] = useState<TStaffView>('team')
	const filters = useForm<TTeamQuery>({ defaultValues: { role: 'all' } })
	const role = useWatch({ control: filters.control, name: 'role' })

	const shiftLabel = (shift: TRosterShift) =>
		shift.hours
			? `${shift.hours.from}–${shift.hours.to}`
			: t(SHIFT_KIND[shift.kind].label)
	const weekDays = WEEK_DAY_ISOS.map((iso, index) => ({
		label: format.date(iso, { weekday: 'short', day: 'numeric' }),
		fullLabel: format.date(iso, { weekday: 'long' }),
		isToday: index === TODAY_COLUMN,
	}))

	const people = STAFF.filter(
		person => role === 'all' || person.role === role,
	).map(person => {
		const status = STAFF_STATUS[person.status]
		const roleInfo = STAFF_ROLE[person.role]
		const name = format.name(person.fullName)
		return {
			id: person.id,
			name,
			initials: getInitials(name),
			tone: person.tone,
			specialty: tEmployee(person.specialty),
			role: { label: tEmployee(roleInfo.label), tone: roleInfo.tone },
			status: {
				label: tEmployee(status.label),
				tone: status.tone,
				dotClass: status.dotClass,
			},
			shift: person.todayShift,
			workplace: translateOptional(tEmployee, person.workplace),
			phone: person.phone,
		}
	})

	const roster = ROSTER.map(member => {
		const name = format.name(member.name)
		const initials = getInitials(name)
		return {
			name,
			initials,
			tone: member.tone,
			days: member.days.map((shift, dayIndex) => {
				const label = shiftLabel(shift)
				return {
					dayIndex,
					label,
					tone: SHIFT_KIND[shift.kind].tone,
					ariaLabel: `${name}, ${weekDays[dayIndex].fullLabel}: ${label}`,
					pick: () =>
						onPickShift({ name, initials, tone: member.tone, dayIndex, shift }),
				}
			}),
		}
	})

	return {
		view,
		setView,
		views: [
			{ id: 'team' as const, label: t('team') },
			{ id: 'roster' as const, label: t('shiftSchedule') },
		],
		filters,
		roles: ROLE_FILTERS.map(option => ({ ...option, label: t(option.label) })),
		people,
		roster,
		weekDays,
		weekRange: t('weekRange', {
			week: WEEK_NUMBER,
			from: format.date(WEEK_DAY_ISOS[0], { day: 'numeric' }),
			to: format.date(addDays(WEEK_START, 6), {
				day: 'numeric',
				month: 'long',
			}),
		}),
	}
}

export type TStaffOverviewModel = ReturnType<typeof useStaffOverview>
export type TTeamMember = TStaffOverviewModel['people'][number]
export type TRosterMember = TStaffOverviewModel['roster'][number]
