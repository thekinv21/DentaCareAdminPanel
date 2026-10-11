'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { Avatar } from '@/shared/ui/avatar'
import { TONE_CLASS } from '@/shared/ui/badge'
import { Legend } from '@/shared/ui/legend'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import type {
	TRosterMember,
	TStaffOverviewModel,
} from '../model/useStaffOverview'

type TRosterTableProps = {
	roster: TRosterMember[]
	weekDays: TStaffOverviewModel['weekDays']
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
									className={day.isToday ? 'text-brand-strong' : undefined}
								>
									{day.label}
								</Th>
							))}
						</tr>
					</thead>
					<tbody>
						{roster.map((member, index) => (
							<RosterRow key={`${index}-${member.name}`} member={member} />
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

type TRosterRowProps = { member: TRosterMember }

function RosterRow({ member }: TRosterRowProps) {
	return (
		<tr>
			<Td>
				<div className='flex items-center gap-2.5'>
					<Avatar initials={member.initials} tone={member.tone} />
					<span className='font-semibold whitespace-nowrap'>{member.name}</span>
				</div>
			</Td>
			{member.days.map(day => (
				<Td key={day.dayIndex}>
					<button
						type='button'
						onClick={day.pick}
						aria-label={day.ariaLabel}
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
	)
}
