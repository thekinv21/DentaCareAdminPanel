'use client'

import Link from 'next/link'

import { Pencil, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PatientFlagBadge } from '@/entities/patient'

import { cn } from '@/shared/lib/cn'
import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui/avatar'
import { IconButton } from '@/shared/ui/icon-button'
import { Td } from '@/shared/ui/table'

import type { PatientRowView } from '../model/usePatientsTable'

export const checkboxClass = 'size-4.25 cursor-pointer accent-brand'

type TPatientRowProps = {
	row: PatientRowView
	onToggle: () => void
}

export function PatientRow({ row, onToggle }: TPatientRowProps) {
	const t = useTranslations('Patients')
	const cell = row.isSelected ? 'bg-brand-soft' : undefined

	return (
		<tr>
			<Td className={cell}>
				<input
					type='checkbox'
					className={checkboxClass}
					aria-label={`${t('select')} ${row.fullName}`}
					checked={row.isSelected}
					onChange={onToggle}
				/>
			</Td>
			<Td className={cell}>
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
			<Td mono nowrap className={cell}>
				{row.phone}
			</Td>
			<Td nowrap className={cn('text-ink-muted', cell)}>
				{row.lastVisit}
			</Td>
			<Td
				nowrap
				className={cn(
					row.isNextVisitToday && 'font-semibold text-brand-strong',
					!row.hasNextVisit && 'text-ink-subtle',
					cell,
				)}
			>
				{row.nextVisit}
			</Td>
			<Td nowrap className={cn('text-ink-muted', cell)}>
				{row.doctor}
			</Td>
			<Td
				mono
				nowrap
				align='right'
				className={cn(
					row.balance ? 'font-semibold text-warning' : 'text-ink-subtle',
					cell,
				)}
			>
				{row.balanceText}
			</Td>
			<Td className={cell}>
				<div className='flex flex-wrap gap-1'>
					{row.flags.map(flag => (
						<PatientFlagBadge key={flag} flag={flag} />
					))}
				</div>
			</Td>
			<Td align='right' nowrap className={cell}>
				<span className='inline-flex gap-0.5'>
					<IconButton
						quiet
						size='sm'
						aria-label={`${t('editColon')} ${row.fullName}`}
						title={t('edit')}
						onClick={row.edit}
					>
						<Pencil size={16} aria-hidden='true' />
					</IconButton>
					<IconButton
						quiet
						size='sm'
						aria-label={`${t('deleteColon')} ${row.fullName}`}
						title={t('delete')}
						onClick={row.remove}
						className='text-danger'
					>
						<Trash2 size={16} aria-hidden='true' />
					</IconButton>
				</span>
			</Td>
		</tr>
	)
}
