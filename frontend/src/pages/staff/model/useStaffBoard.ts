'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import {
	STAFF,
	STAFF_ROLE,
	STAFF_STATUS,
	type StaffRole,
} from '@/entities/employee'

import { getInitials } from '@/shared/lib/format'
import { translateOptional, useFormat } from '@/shared/lib/i18n'

import { ROSTER, SHIFT, TODAY_COLUMN, WEEK_DAYS } from './Roster'
import type { TShiftTarget } from './useShiftForm'

export type StaffView = 'team' | 'roster'
export type RoleFilter = 'all' | StaffRole

const ROLES: { id: RoleFilter; label: string }[] = [
	{ id: 'all', label: 'all' },
	{ id: 'dentist', label: 'dentists' },
	{ id: 'assistant', label: 'assistants' },
	{ id: 'reception', label: 'administrators' },
]

/**
 * Team list filtered by role and the weekly shift roster
 */
export function useStaffBoard(onPickShift: (target: TShiftTarget) => void) {
	const t = useTranslations('Staff')
	const tEmployee = useTranslations('Employee')
	const format = useFormat()
	const [view, setView] = useState<StaffView>('team')
	const [role, setRole] = useState<RoleFilter>('all')

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

	const roster = ROSTER.map(row => {
		const name = format.name(row.name)
		const initials = getInitials(name)
		return {
			name,
			initials,
			tone: row.tone,
			days: row.days.map((key, index) => {
				const label = translateOptional(t, SHIFT[key].label)
				return {
					key: index,
					label,
					tone: SHIFT[key].tone,
					aria: `${name}, ${t(WEEK_DAYS[index])}: ${label}`,
					pick: () =>
						onPickShift({
							name,
							initials,
							tone: row.tone,
							dayIndex: index,
							shift: key,
						}),
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
		role,
		setRole,
		roles: ROLES.map(option => ({ ...option, label: t(option.label) })),
		people,
		roster,
		weekDays: WEEK_DAYS.map((day, index) => ({
			label: t(day),
			today: index === TODAY_COLUMN,
		})),
	}
}

export type StaffBoardModel = ReturnType<typeof useStaffBoard>
