'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { Avatar } from '@/shared/ui/avatar'
import { TONE_CLASS } from '@/shared/ui/badge'
import { Legend } from '@/shared/ui/legend'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import type { TStaffBoardModel } from '../model/useStaffBoard'

type TRosterTableProps = {
	roster: TStaffBoardModel['roster']
	weekDays: TStaffBoardModel['weekDays']
}

export function RosterTable({ roster, weekDays }: TRosterTableProps) {
	const t = useTranslations('Staff')
	return (
		<>
			<TableScroll className='min-h-0 flex-auto animate-fade'>
				<Table className='min-w-215'>
					<thead>
						<tr>
							<Th>{t('staffMember')}</Th>
							{weekDays.map(day => (
								<Th
									key={day.label}
									className={day.today ? 'text-brand-strong' : undefined}
								>
									{day.label}
								</Th>
							))}
						</tr>
					</thead>
					<tbody>
						{roster.map(row => (
							<tr key={row.name}>
								<Td>
									<div className='flex items-center gap-2.5'>
										<Avatar initials={row.initials} tone={row.tone} />
										<span className='font-semibold whitespace-nowrap'>
											{row.name}
										</span>
									</div>
								</Td>
								{row.days.map(day => (
									<Td key={day.key}>
										<button
											type='button'
											onClick={day.pick}
											aria-label={day.aria}
											className={cn(
												'inline-flex h-7 min-w-23 items-center justify-center rounded-lg px-2 font-mono text-xs font-semibold whitespace-nowrap transition-shadow hover:shadow-[0_0_0_2px_var(--brand)]',
												TONE_CLASS[day.tone],
											)}
										>
											{day.label}
										</button>
									</Td>
								))}
							</tr>
						))}
					</tbody>
				</Table>
			</TableScroll>
			<Legend
				items={[
					{ label: t('shift'), swatch: TONE_CLASS.brand },
					{ label: t('leave'), swatch: TONE_CLASS.accent },
					{ label: t('needsReplacement'), swatch: TONE_CLASS.warning },
					{ label: t('dayOff'), swatch: TONE_CLASS.neutral },
				]}
			/>
		</>
	)
}
