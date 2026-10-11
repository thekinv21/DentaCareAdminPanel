import type { TPatient, TPatientSegment } from '@/entities/patient'

import { matchesText } from '@/shared/lib/search'

export type TPatientsTab = 'all' | Exclude<TPatientSegment, 'active'>
export type TSortKey = 'name' | 'balance'
type TSort = { key: TSortKey; direction: 1 | -1 }

/**
 * Query of the patient list: segment, search text and sorting
 */
export type TPatientsQuery = {
	tab: TPatientsTab
	search: string
	sort: TSort | null
}

export const DEFAULT_PATIENTS_QUERY: TPatientsQuery = {
	tab: 'all',
	search: '',
	sort: null,
}

/**
 * Mock segment sizes of the whole register (the list shows the first page)
 */
export const PATIENT_TABS: {
	id: TPatientsTab
	label: string
	count: number
}[] = [
	{ id: 'all', label: 'all', count: 1284 },
	{ id: 'today', label: 'today', count: 28 },
	{ id: 'recall', label: 'followUpExam', count: 17 },
	{ id: 'debt', label: 'withBalanceDue', count: 23 },
]

export const PAGE_SIZE = 10

function matchesTab(patient: TPatient, tab: TPatientsTab) {
	if (tab === 'all') return true
	if (tab === 'today')
		return patient.segment === 'today' || patient.isNextVisitToday
	return patient.segment === tab
}

const byName = (first: TPatient, second: TPatient) =>
	first.fullName.localeCompare(second.fullName, 'ru')
const byBalance = (first: TPatient, second: TPatient) =>
	first.balance - second.balance

/**
 * Patients of the query, in the chosen order
 */
export function queryPatients(
	patients: TPatient[],
	query: TPatientsQuery,
	removedIds: Set<string>,
): TPatient[] {
	const { tab, search, sort } = query
	const found = patients.filter(
		patient =>
			!removedIds.has(patient.id) &&
			matchesTab(patient, tab) &&
			matchesText(`${patient.fullName} ${patient.id} ${patient.phone}`, search),
	)
	if (!sort) return found
	const compare = sort.key === 'name' ? byName : byBalance
	return found.sort((first, second) => compare(first, second) * sort.direction)
}
