'use client'

import Link from 'next/link'

import { UserRoundPlus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ROUTES } from '@/shared/routes'
import { SearchInput } from '@/shared/ui/search-input'

import { usePatientSearch } from '../model/usePatientSearch'
import { PatientSearchResultItem } from './PatientSearchResultItem'

type TPatientSearchProps = { onPick: (patientId: string) => void }

/**
 * Search box with the first matching patients and a link to add a new one
 */
export function PatientSearch({ onPick }: TPatientSearchProps) {
	const t = useTranslations('AppointmentForm')
	const search = usePatientSearch()

	return (
		<>
			<SearchInput
				label={t('searchPatient')}
				placeholder={t('searchPatientPlaceholder')}
				{...search.inputProps}
			/>
			<div className='flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface shadow-clay-sm'>
				<ul aria-label={t('foundPatients')} className='flex flex-col'>
					{search.results.map(result => (
						<PatientSearchResultItem
							key={result.id}
							result={result}
							onPick={onPick}
						/>
					))}
				</ul>
				<Link
					href={ROUTES.patients}
					className='flex items-center gap-2 bg-raised px-3 py-2.5 font-semibold text-brand no-underline'
				>
					<UserRoundPlus size={16} aria-hidden='true' />
					{t('newPatient')}
				</Link>
			</div>
		</>
	)
}
