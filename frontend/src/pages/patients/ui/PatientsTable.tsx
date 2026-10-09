'use client'

import { useState } from 'react'

import Link from 'next/link'

import {
	ChevronLeft,
	ChevronRight,
	ChevronsUpDown,
	Download,
	Ellipsis,
	Funnel,
} from 'lucide-react'

import {
	type Patient,
	PatientFlagBadge,
	PATIENTS,
	PATIENTS_TOTAL,
	type PatientSegment,
} from '@/entities/patient'

import { cn } from '@/shared/lib/cn'
import { formatNumber, formatSom, getInitials } from '@/shared/lib/format'
import { ROUTES } from '@/shared/routes'
import { Avatar, avatarTone } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { IconButton } from '@/shared/ui/icon-button'
import { SearchInput } from '@/shared/ui/search-input'
import { Segmented } from '@/shared/ui/segmented'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

type Tab = 'all' | Exclude<PatientSegment, 'active'>
type SortKey = 'name' | 'balance'

const TABS: { id: Tab; label: string; count: string }[] = [
	{ id: 'all', label: 'Все', count: '1 284' },
	{ id: 'today', label: 'Сегодня', count: '28' },
	{ id: 'recall', label: 'Повторный осмотр', count: '17' },
	{ id: 'debt', label: 'С долгом', count: '23' },
]

function matchesTab(patient: Patient, tab: Tab) {
	if (tab === 'all') return true
	if (tab === 'today')
		return patient.segment === 'today' || patient.isNextVisitToday
	return patient.segment === tab
}

const checkboxClass = 'size-[17px] cursor-pointer accent-brand'

function SortButton({
	label,
	onClick,
}: {
	label: string
	onClick: () => void
}) {
	return (
		<button
			type='button'
			onClick={onClick}
			className='inline-flex items-center gap-1 border-0 bg-transparent p-0 tracking-[inherit] text-inherit uppercase'
		>
			{label}
			<ChevronsUpDown size={12} strokeWidth={2.4} aria-hidden='true' />
		</button>
	)
}

export function PatientsTable() {
	const [tab, setTab] = useState<Tab>('all')
	const [selected, setSelected] = useState<Set<string>>(new Set())
	const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 } | null>(null)

	let rows = PATIENTS.filter(patient => matchesTab(patient, tab))
	if (sort?.key === 'name') {
		rows = [...rows].sort(
			(a, b) => a.fullName.localeCompare(b.fullName, 'ru') * sort.dir,
		)
	}
	if (sort?.key === 'balance') {
		rows = [...rows].sort((a, b) => (a.balance - b.balance) * sort.dir)
	}

	const allSelected = rows.length > 0 && rows.every(row => selected.has(row.id))

	const toggleSort = (key: SortKey) =>
		setSort(current => ({
			key,
			dir: current?.key === key ? (current.dir === 1 ? -1 : 1) : 1,
		}))

	const ariaSort = (key: SortKey) =>
		sort?.key === key ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'

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
			rows.forEach(row =>
				allSelected ? next.delete(row.id) : next.add(row.id),
			)
			return next
		})

	return (
		<Card
			as='section'
			className='min-h-[420px] flex-auto animate-rise max-[720px]:flex-none'
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<Segmented
					aria-label='Сегменты'
					options={TABS}
					value={tab}
					onChange={setTab}
				/>
				<div className='flex flex-wrap gap-2'>
					<SearchInput
						label='Имя, ID или телефон'
						size='sm'
						className='basis-60'
					/>
					<Button size='sm' className='h-9'>
						<Funnel size={15} aria-hidden='true' />
						Врач
					</Button>
					<Button size='sm' className='h-9'>
						<Download size={15} aria-hidden='true' />
						Экспорт
					</Button>
				</div>
			</div>

			{selected.size > 0 && (
				<div
					role='status'
					className='flex animate-pop flex-wrap items-center gap-2 rounded-xl bg-brand-soft py-1.5 pr-1.5 pl-3.5 text-brand-strong'
				>
					<span className='flex-grow font-semibold'>
						Выбрано: {selected.size}
					</span>
					<Button size='sm' variant='primary'>
						Отправить SMS
					</Button>
					<Button size='sm'>Назначить врача</Button>
					<Button
						size='sm'
						variant='ghost'
						className='text-brand-strong'
						onClick={() => setSelected(new Set())}
					>
						Сбросить
					</Button>
				</div>
			)}

			<TableScroll className='min-h-0 flex-auto'>
				<Table className='min-w-[900px]'>
					<thead>
						<tr>
							<Th className='w-10'>
								<input
									type='checkbox'
									className={checkboxClass}
									aria-label='Выбрать все'
									checked={allSelected}
									onChange={toggleAll}
								/>
							</Th>
							<Th aria-sort={ariaSort('name')}>
								<SortButton
									label='Пациент'
									onClick={() => toggleSort('name')}
								/>
							</Th>
							<Th>Телефон</Th>
							<Th>Последний визит</Th>
							<Th>Следующий визит</Th>
							<Th>Врач</Th>
							<Th align='right' aria-sort={ariaSort('balance')}>
								<SortButton
									label='Долг'
									onClick={() => toggleSort('balance')}
								/>
							</Th>
							<Th>Метки</Th>
							<Th className='w-11'>
								<span className='sr-only'>Действия</span>
							</Th>
						</tr>
					</thead>
					<tbody>
						{rows.map(patient => {
							const isSelected = selected.has(patient.id)
							const cellClass = isSelected ? 'bg-brand-soft' : undefined
							return (
								<tr key={patient.id}>
									<Td className={cellClass}>
										<input
											type='checkbox'
											className={checkboxClass}
											aria-label={`Выбрать: ${patient.fullName}`}
											checked={isSelected}
											onChange={() => toggleRow(patient.id)}
										/>
									</Td>
									<Td className={cellClass}>
										<div className='flex items-center gap-2.5'>
											<Avatar
												initials={getInitials(patient.fullName)}
												tone={avatarTone(PATIENTS.indexOf(patient))}
											/>
											<div className='min-w-0'>
												<Link
													href={ROUTES.patient(patient.id)}
													className='block font-semibold whitespace-nowrap text-ink no-underline hover:underline'
												>
													{patient.fullName}
												</Link>
												<span className='font-mono text-[11.5px] whitespace-nowrap text-ink-muted'>
													{patient.id} · {patient.age}
												</span>
											</div>
										</div>
									</Td>
									<Td mono nowrap className={cellClass}>
										{patient.phone}
									</Td>
									<Td nowrap className={cn('text-ink-muted', cellClass)}>
										{patient.lastVisit}
									</Td>
									<Td
										nowrap
										className={cn(
											patient.isNextVisitToday &&
												'font-semibold text-brand-strong',
											!patient.nextVisit && 'text-ink-subtle',
											cellClass,
										)}
									>
										{patient.nextVisit ?? 'Не назначен'}
									</Td>
									<Td nowrap className={cn('text-ink-muted', cellClass)}>
										{patient.doctor}
									</Td>
									<Td
										mono
										nowrap
										align='right'
										className={cn(
											patient.balance
												? 'font-semibold text-warning'
												: 'text-ink-subtle',
											cellClass,
										)}
									>
										{patient.balance ? formatSom(patient.balance) : '—'}
									</Td>
									<Td className={cellClass}>
										<div className='flex flex-wrap gap-1'>
											{patient.flags.map(flag => (
												<PatientFlagBadge key={flag} flag={flag} />
											))}
										</div>
									</Td>
									<Td align='right' className={cellClass}>
										<IconButton
											quiet
											size='sm'
											aria-label={`Действия: ${patient.fullName}`}
										>
											<Ellipsis size={16} aria-hidden='true' />
										</IconButton>
									</Td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</TableScroll>

			<div className='flex flex-wrap items-center justify-between gap-2.5 pt-0.5 text-[12.5px] text-ink-muted'>
				<span>
					Показано <span className='font-mono text-ink'>1–{rows.length}</span>{' '}
					из{' '}
					<span className='font-mono text-ink'>
						{formatNumber(PATIENTS_TOTAL)}
					</span>
				</span>
				<nav aria-label='Страницы' className='flex items-center gap-1'>
					<IconButton size='sm' aria-label='Назад' disabled>
						<ChevronLeft size={15} aria-hidden='true' />
					</IconButton>
					<button
						type='button'
						aria-current='page'
						className='h-8 min-w-8 rounded-xl bg-brand-soft font-mono font-semibold text-brand-strong'
					>
						1
					</button>
					{['2', '3'].map(page => (
						<button
							key={page}
							type='button'
							className='h-8 min-w-8 rounded-xl font-mono text-ink hover:bg-raised'
						>
							{page}
						</button>
					))}
					<span aria-hidden='true' className='px-0.5'>
						…
					</span>
					<button
						type='button'
						className='h-8 min-w-10 rounded-xl font-mono text-ink hover:bg-raised'
					>
						129
					</button>
					<IconButton size='sm' aria-label='Вперёд'>
						<ChevronRight size={15} aria-hidden='true' />
					</IconButton>
				</nav>
			</div>
		</Card>
	)
}
