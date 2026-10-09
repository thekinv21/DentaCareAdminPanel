'use client'

import { cn } from '@/shared/lib/cn'
import { useI18n } from '@/shared/lib/i18n'
import { Avatar } from '@/shared/ui/avatar'
import { TONE_CLASS } from '@/shared/ui/badge'
import { Legend } from '@/shared/ui/legend'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import type { StaffBoardModel } from '../model/use-staff-board'

interface RosterTableProps {
	roster: StaffBoardModel['roster']
	weekDays: StaffBoardModel['weekDays']
}

export function RosterTable({ roster, weekDays }: RosterTableProps) {
	const { t } = useI18n()
	return (
		<>
			<TableScroll className='min-h-0 flex-auto animate-fade'>
				<Table className='min-w-[860px]'>
					<thead>
						<tr>
							<Th>{t('Сотрудник')}</Th>
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
										<span
											className={cn(
												'inline-flex h-7 min-w-[92px] items-center justify-center rounded-lg px-2 font-mono text-xs font-semibold whitespace-nowrap',
												TONE_CLASS[day.tone],
											)}
										>
											{day.label}
										</span>
									</Td>
								))}
							</tr>
						))}
					</tbody>
				</Table>
			</TableScroll>
			<Legend
				items={[
					{ label: t('Смена'), swatch: TONE_CLASS.brand },
					{ label: t('Отпуск'), swatch: TONE_CLASS.accent },
					{ label: t('Нужна замена'), swatch: TONE_CLASS.warning },
					{ label: t('Выходной'), swatch: TONE_CLASS.neutral },
				]}
			/>
		</>
	)
}
