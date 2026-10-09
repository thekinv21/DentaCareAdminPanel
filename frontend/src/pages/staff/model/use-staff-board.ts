'use client'

import { useState } from 'react'

import {
	STAFF,
	STAFF_ROLE,
	STAFF_STATUS,
	type StaffRole,
} from '@/entities/employee'

import { getInitials } from '@/shared/lib/format'
import { useI18n } from '@/shared/lib/i18n'

import { ROSTER, SHIFT, TODAY_COLUMN, WEEK_DAYS } from './roster'

export type StaffView = 'team' | 'roster'
export type RoleFilter = 'all' | StaffRole

const ROLES: { id: RoleFilter; label: string }[] = [
	{ id: 'all', label: 'Все' },
	{ id: 'dentist', label: 'Врачи' },
	{ id: 'assistant', label: 'Ассистенты' },
	{ id: 'reception', label: 'Администраторы' },
]

/**
 * Team list filtered by role and the weekly shift roster
 */
export function useStaffBoard() {
	const { t, format } = useI18n()
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
			specialty: t(person.specialty),
			role: { label: t(roleInfo.label), tone: roleInfo.tone },
			status: {
				label: t(status.label),
				tone: status.tone,
				dotClass: status.dotClass,
			},
			shift: t(person.todayShift),
			workplace: t(person.workplace),
			phone: person.phone,
		}
	})

	const roster = ROSTER.map(row => {
		const name = format.name(row.name)
		return {
			name,
			initials: getInitials(name),
			tone: row.tone,
			days: row.days.map((key, index) => ({
				key: index,
				label: t(SHIFT[key].label),
				tone: SHIFT[key].tone,
			})),
		}
	})

	return {
		view,
		setView,
		views: [
			{ id: 'team' as const, label: t('Команда') },
			{ id: 'roster' as const, label: t('График смен') },
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
