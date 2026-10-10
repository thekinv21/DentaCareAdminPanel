'use client'

import { useTranslations } from 'next-intl'

import { Table, TableScroll, Th } from '@/shared/ui/table'

import type { TTeamMember } from '../model/useStaffOverview'
import { TeamRow } from './TeamRow'

const TEAM_COLUMNS = [
	'staffMember',
	'role',
	'status',
	'today',
	'chair',
	'phone',
]

type TTeamTableProps = { people: TTeamMember[] }

export function TeamTable({ people }: TTeamTableProps) {
	const t = useTranslations('Staff')

	return (
		<TableScroll className='min-h-0 flex-auto animate-fade'>
			<Table className='min-w-215'>
				<thead>
					<tr>
						{TEAM_COLUMNS.map(column => (
							<Th key={column}>{t(column)}</Th>
						))}
						<Th>
							<span className='sr-only'>{t('actions')}</span>
						</Th>
					</tr>
				</thead>
				<tbody>
					{people.map(person => (
						<TeamRow key={person.id} person={person} />
					))}
				</tbody>
			</Table>
		</TableScroll>
	)
}
