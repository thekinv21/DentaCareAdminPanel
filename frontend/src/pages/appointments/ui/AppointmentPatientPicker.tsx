'use client'

import Link from 'next/link'

import { TriangleAlert, UserRoundPlus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Field } from '@/shared/ui/field'
import { SearchInput } from '@/shared/ui/search-input'

import type { TAppointmentFormModel } from '../model/useAppointmentForm'

type TAppointmentPatientPickerProps = { form: TAppointmentFormModel }

export function AppointmentPatientPicker({
	form,
}: TAppointmentPatientPickerProps) {
	const t = useTranslations('AppointmentForm')
	const { patient } = form

	return (
		<Field
			as='div'
			label={t('patient')}
			required
			error={form.errorOf('patientId')}
		>
			{patient ? (
				<div className='flex items-center gap-3 rounded-[14px] border-[1.5px] border-brand bg-brand-soft px-3 py-2.5'>
					<Avatar initials={patient.initials} tone={patient.tone} size={40} />
					<div className='min-w-0 flex-1'>
						<div className='flex flex-wrap items-center gap-2'>
							<span className='font-bold'>{patient.name}</span>
							{patient.allergy && (
								<Badge tone='danger'>
									<TriangleAlert size={12} aria-hidden='true' />
									{t('allergy')}
								</Badge>
							)}
						</div>
						{patient.id && (
							<div className='text-[12.5px] text-ink-muted'>
								<span className='font-mono'>{patient.id}</span> ·{' '}
								{patient.phone}
							</div>
						)}
					</div>
					<Button size='sm' onClick={() => form.set('patientId', '')}>
						{t('change')}
					</Button>
				</div>
			) : (
				<>
					<SearchInput
						label={t('searchPatient')}
						placeholder={t('searchPatientPlaceholder')}
						value={form.query}
						onChange={event => form.setQuery(event.target.value)}
					/>
					<div
						role='listbox'
						aria-label={t('foundPatients')}
						className='flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface shadow-clay-sm'
					>
						{form.results.map(result => (
							<button
								key={result.id}
								type='button'
								role='option'
								aria-selected={false}
								onClick={() => form.set('patientId', result.id)}
								className='flex items-center gap-2.5 border-b border-line bg-transparent px-3 py-2.25 text-left last:border-b-0 hover:bg-raised'
							>
								<Avatar initials={result.initials} tone={result.tone} />
								<span className='min-w-0 flex-1'>
									<span className='block font-semibold'>{result.name}</span>
									<span className='block text-[12.5px] text-ink-muted'>
										<span className='font-mono'>{result.id}</span> ·{' '}
										{result.phone}
									</span>
								</span>
								<span className='text-[12.5px] whitespace-nowrap text-ink-muted'>
									{result.last}
								</span>
							</button>
						))}
						<Link
							href={ROUTES.patients}
							className='flex items-center gap-2 bg-raised px-3 py-2.5 font-semibold text-brand no-underline'
						>
							<UserRoundPlus size={16} aria-hidden='true' />
							{t('newPatient')}
						</Link>
					</div>
				</>
			)}
		</Field>
	)
}
