'use client'

import Link from 'next/link'

import { useTranslations } from 'next-intl'

import { PatientFlagBadge } from '@/entities/patient'

import { cn } from '@/shared/lib/cn'
import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui/avatar'
import { RowActions } from '@/shared/ui/row-actions'
import { Td } from '@/shared/ui/table'

import type { TPatientRowView } from '../model/usePatientsTable'

export const rowCheckboxClass = 'size-4.25 cursor-pointer accent-brand'

type TPatientRowProps = { row: TPatientRowView }

export function PatientRow({ row }: TPatientRowProps) {
	const t = useTranslations('Patients')
	const selectedCellClass = row.isSelected ? 'bg-brand-soft' : undefined

	return (
		<tr>
			<Td className={selectedCellClass}>
				<input
					type='checkbox'
					className={rowCheckboxClass}
					aria-label={`${t('select')} ${row.fullName}`}
					checked={row.isSelected}
					onChange={row.toggle}
				/>
			</Td>
			<Td className={selectedCellClass}>
				<div className='flex items-center gap-2.5'>
					<Avatar initials={row.initials} tone={row.tone} />
					<div className='min-w-0'>
						<Link
							href={ROUTES.patient(row.id)}
							className='block font-semibold whitespace-nowrap text-ink no-underline hover:underline'
						>
							{row.fullName}
						</Link>
						<span className='font-mono text-[11.5px] whitespace-nowrap text-ink-muted'>
							{row.id} · {row.age}
						</span>
					</div>
				</div>
			</Td>
			<Td mono nowrap className={selectedCellClass}>
				{row.phone}
			</Td>
			<Td nowrap className={cn('text-ink-muted', selectedCellClass)}>
				{row.lastVisit}
			</Td>
			<Td
				nowrap
				className={cn(
					row.isNextVisitToday && 'font-semibold text-brand-strong',
					!row.hasNextVisit && 'text-ink-subtle',
					selectedCellClass,
				)}
			>
				{row.nextVisit}
			</Td>
			<Td nowrap className={cn('text-ink-muted', selectedCellClass)}>
				{row.doctor}
			</Td>
			<Td
				mono
				nowrap
				align='right'
				className={cn(
					row.balance ? 'font-semibold text-warning' : 'text-ink-subtle',
					selectedCellClass,
				)}
			>
				{row.balanceText}
			</Td>
			<Td className={selectedCellClass}>
				<div className='flex flex-wrap gap-1'>
					{row.flags.map(flag => (
						<PatientFlagBadge key={flag} flag={flag} />
					))}
				</div>
			</Td>
			<Td align='right' nowrap className={selectedCellClass}>
				<RowActions
					subject={row.fullName}
					onEdit={row.edit}
					onDelete={row.remove}
				/>
			</Td>
		</tr>
	)
}
