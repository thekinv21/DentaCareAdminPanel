'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { type Patient, PATIENTS, type PatientSegment } from '@/entities/patient'

import { getInitials } from '@/shared/lib/format'
import { translateOptional, useFormat } from '@/shared/lib/i18n'
import { avatarTone } from '@/shared/ui/avatar'

export type PatientsTab = 'all' | Exclude<PatientSegment, 'active'>
type SortKey = 'name' | 'balance'
type Sort = { key: SortKey; dir: 1 | -1 } | null

const TABS: { id: PatientsTab; label: string; count: string }[] = [
	{ id: 'all', label: 'all', count: '1 284' },
	{ id: 'today', label: 'today', count: '28' },
	{ id: 'recall', label: 'followUpExam', count: '17' },
	{ id: 'debt', label: 'withBalanceDue', count: '23' },
]

function matchesTab(patient: Patient, tab: PatientsTab) {
	if (tab === 'all') return true
	if (tab === 'today')
		return patient.segment === 'today' || patient.isNextVisitToday
	return patient.segment === tab
}

function sortPatients(list: Patient[], sort: Sort) {
	if (!sort) return list
	const compare =
		sort.key === 'name'
			? (a: Patient, b: Patient) => a.fullName.localeCompare(b.fullName, 'ru')
			: (a: Patient, b: Patient) => a.balance - b.balance
	return [...list].sort((a, b) => compare(a, b) * sort.dir)
}

/**
 * Segment tabs, sorting and row selection of the patient list
 */
export function usePatientsTable() {
	const t = useTranslations('Patients')
	const tPatient = useTranslations('Patient')
	const format = useFormat()
	const [tab, setTab] = useState<PatientsTab>('all')
	const [selected, setSelected] = useState<Set<string>>(new Set())
	const [sort, setSort] = useState<Sort>(null)

	const visible = sortPatients(
		PATIENTS.filter(p => matchesTab(p, tab)),
		sort,
	)
	const allSelected =
		visible.length > 0 && visible.every(p => selected.has(p.id))

	const rows = visible.map(patient => ({
		...patient,
		fullName: format.name(patient.fullName),
		initials: getInitials(format.name(patient.fullName)),
		tone: avatarTone(PATIENTS.indexOf(patient)),
		age: tPatient(patient.age),
		lastVisit: translateOptional(tPatient, patient.lastVisit),
		nextVisit: patient.nextVisit
			? translateOptional(tPatient, patient.nextVisit)
			: t('unassigned'),
		hasNextVisit: !!patient.nextVisit,
		doctor: format.name(patient.doctor),
		balanceText: patient.balance ? format.som(patient.balance) : '—',
		isSelected: selected.has(patient.id),
	}))

	const toggleRow = (id: string) =>
		setSelected(current => {
			const next = new Set(current)
			if (next.has(id)) next.delete(id)
			else next.add(id)
			return next
		})

	const toggleAll = () =>
		setSelected(current => {
			const next = new Set(current)
			visible.forEach(p => (allSelected ? next.delete(p.id) : next.add(p.id)))
			return next
		})

	const toggleSort = (key: SortKey) =>
		setSort(current => ({
			key,
			dir: current?.key === key && current.dir === 1 ? -1 : 1,
		}))

	const ariaSort = (key: SortKey) =>
		sort?.key === key
			? sort.dir === 1
				? 'ascending'
				: 'descending'
			: ('none' as const)

	return {
		tab,
		setTab,
		tabs: TABS.map(item => ({ ...item, label: t(item.label) })),
		rows,
		selectedCount: selected.size,
		allSelected,
		toggleRow,
		toggleAll,
		clearSelection: () => setSelected(new Set()),
		toggleSort,
		ariaSort,
	}
}

export type PatientRowView = ReturnType<typeof usePatientsTable>['rows'][number]
