'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import {
	PATIENTS,
	type TPatient,
	type TPatientSegment,
} from '@/entities/patient'

import { getInitials } from '@/shared/lib/format'
import { translateOptional, useFormat } from '@/shared/lib/i18n'
import { avatarTone } from '@/shared/ui/avatar'

type TPatientsTab = 'all' | Exclude<TPatientSegment, 'active'>
type TSortKey = 'name' | 'balance'
type TSort = { key: TSortKey; dir: 1 | -1 }

/**
 * Query of the patient list: segment, search text and sorting
 */
type TPatientsFilter = {
	tab: TPatientsTab
	search: string
	sort: TSort | null
}

const DEFAULT_FILTER: TPatientsFilter = { tab: 'all', search: '', sort: null }

const TABS: { id: TPatientsTab; label: string; count: string }[] = [
	{ id: 'all', label: 'all', count: '1 284' },
	{ id: 'today', label: 'today', count: '28' },
	{ id: 'recall', label: 'followUpExam', count: '17' },
	{ id: 'debt', label: 'withBalanceDue', count: '23' },
]

function matchesTab(patient: TPatient, tab: TPatientsTab) {
	if (tab === 'all') return true
	if (tab === 'today')
		return patient.segment === 'today' || patient.isNextVisitToday
	return patient.segment === tab
}

function matchesSearch(patient: TPatient, search: string) {
	const needle = search.trim().toLowerCase()
	return (
		!needle ||
		`${patient.fullName} ${patient.id} ${patient.phone}`
			.toLowerCase()
			.includes(needle)
	)
}

function sortPatients(list: TPatient[], sort: TSort | null) {
	if (!sort) return list
	const compare =
		sort.key === 'name'
			? (a: TPatient, b: TPatient) => a.fullName.localeCompare(b.fullName, 'ru')
			: (a: TPatient, b: TPatient) => a.balance - b.balance
	return [...list].sort((a, b) => compare(a, b) * sort.dir)
}

type TPatientsTableOptions = {
	removedIds: Set<string>
	onEdit: (patient: TPatient) => void
	onRemove: (patient: TPatient) => void
	onBulkRemove: (patients: TPatient[], onDone: () => void) => void
}

/**
 * Filtered, sorted patient rows and the row selection for bulk actions
 */
export function usePatientsTable(options: TPatientsTableOptions) {
	const { removedIds, onEdit, onRemove, onBulkRemove } = options

	const t = useTranslations('Patients')
	const tPatient = useTranslations('Patient')
	const format = useFormat()
	const filters = useForm<TPatientsFilter>({ defaultValues: DEFAULT_FILTER })
	const [tab, search, sort] = useWatch({
		control: filters.control,
		name: ['tab', 'search', 'sort'],
	})
	const [selected, setSelected] = useState<Set<string>>(new Set())

	const visible = sortPatients(
		PATIENTS.filter(
			p =>
				!removedIds.has(p.id) && matchesTab(p, tab) && matchesSearch(p, search),
		),
		sort,
	)
	const allSelected =
		visible.length > 0 && visible.every(p => selected.has(p.id))
	const clearSelection = () => setSelected(new Set())

	const rows = visible.map(patient => {
		const name = format.name(patient.fullName)
		return {
			...patient,
			fullName: name,
			initials: getInitials(name),
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
			toggle: () =>
				setSelected(current => {
					const next = new Set(current)
					if (next.has(patient.id)) next.delete(patient.id)
					else next.add(patient.id)
					return next
				}),
			edit: () => onEdit(patient),
			remove: () => onRemove(patient),
		}
	})

	return {
		filters,
		tabs: TABS.map(item => ({ ...item, label: t(item.label) })),
		rows,
		selectedCount: selected.size,
		allSelected,
		toggleAll: () =>
			setSelected(current => {
				const next = new Set(current)
				visible.forEach(p => (allSelected ? next.delete(p.id) : next.add(p.id)))
				return next
			}),
		clearSelection,
		bulkDelete: () =>
			onBulkRemove(
				visible.filter(p => selected.has(p.id)),
				clearSelection,
			),
		toggleSort: (key: TSortKey) =>
			filters.setValue('sort', {
				key,
				dir: sort?.key === key && sort.dir === 1 ? -1 : 1,
			}),
		ariaSort: (key: TSortKey) =>
			sort?.key !== key ? 'none' : sort.dir === 1 ? 'ascending' : 'descending',
	}
}

export type TPatientsTableModel = ReturnType<typeof usePatientsTable>
export type TPatientRowView = TPatientsTableModel['rows'][number]
