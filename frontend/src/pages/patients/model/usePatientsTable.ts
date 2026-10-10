'use client'

import { useMemo } from 'react'

import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import {
	patientAvatarTone,
	PATIENTS,
	PATIENTS_TOTAL,
	type TPatient,
	usePatientLabels,
} from '@/entities/patient'

import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'

import {
	DEFAULT_PATIENTS_QUERY,
	PAGE_SIZE,
	PATIENT_TABS,
	queryPatients,
	type TPatientsQuery,
	type TSortKey,
} from './PatientsQuery'
import { usePatientSelection } from './usePatientSelection'

type TPatientsTableOptions = {
	removedIds: Set<string>
	onEdit: (patient: TPatient) => void
	onRemove: (patient: TPatient) => void
	onBulkRemove: (patients: TPatient[], onDone: () => void) => void
}

const LAST_PAGE = Math.ceil(PATIENTS_TOTAL / PAGE_SIZE)

/**
 * Filtered, sorted patient rows and the row selection for bulk actions
 */
export function usePatientsTable(options: TPatientsTableOptions) {
	const { removedIds, onEdit, onRemove, onBulkRemove } = options

	const t = useTranslations('Patients')
	const patientLabels = usePatientLabels()
	const format = useFormat()
	const filters = useForm<TPatientsQuery>({
		defaultValues: DEFAULT_PATIENTS_QUERY,
	})
	const [tab, search, sort] = useWatch({
		control: filters.control,
		name: ['tab', 'search', 'sort'],
	})

	// the real register holds 1 284 patients: don't refilter on every checkbox click
	const visiblePatients = useMemo(
		() => queryPatients(PATIENTS, { tab, search, sort }, removedIds),
		[tab, search, sort, removedIds],
	)
	const visibleIds = useMemo(
		() => visiblePatients.map(patient => patient.id),
		[visiblePatients],
	)
	const selection = usePatientSelection(visibleIds)

	const rows = visiblePatients.map(patient => {
		const name = format.name(patient.fullName)
		return {
			...patient,
			fullName: name,
			initials: getInitials(name),
			tone: patientAvatarTone(patient.id),
			age: patientLabels.age(patient),
			lastVisit: patientLabels.lastVisit(patient),
			nextVisit: patientLabels.nextVisit(patient) ?? t('unassigned'),
			hasNextVisit: !!patient.nextVisit,
			doctor: format.name(patient.doctor),
			balanceText: patient.balance ? format.som(patient.balance) : '—',
			isSelected: selection.selectedIds.has(patient.id),
			toggle: () => selection.toggle(patient.id),
			edit: () => onEdit(patient),
			remove: () => onRemove(patient),
		}
	})

	return {
		filters,
		tabs: PATIENT_TABS.map(tabOption => ({
			id: tabOption.id,
			label: t(tabOption.label),
			count: format.number(tabOption.count),
		})),
		rows,
		selectedCount: selection.selectedIds.size,
		isAllSelected: selection.isAllSelected,
		toggleAll: selection.toggleAll,
		clearSelection: selection.clear,
		bulkDelete: () =>
			onBulkRemove(
				visiblePatients.filter(patient =>
					selection.selectedIds.has(patient.id),
				),
				selection.clear,
			),
		toggleSort: (key: TSortKey) =>
			filters.setValue('sort', {
				key,
				direction: sort?.key === key && sort.direction === 1 ? -1 : 1,
			}),
		getAriaSort: (key: TSortKey) =>
			sort?.key !== key
				? 'none'
				: sort.direction === 1
					? 'ascending'
					: 'descending',
		shownRange: `1–${rows.length}`,
		total: format.number(PATIENTS_TOTAL),
		pages: [1, 2, 3, null, LAST_PAGE],
	}
}

export type TPatientsTableModel = ReturnType<typeof usePatientsTable>
export type TPatientRowView = TPatientsTableModel['rows'][number]
