'use client'

import { useI18n } from '@/shared/lib/i18n'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Segmented } from '@/shared/ui/segmented'

import { useStaffBoard } from '../model/use-staff-board'
import { RosterTable } from './RosterTable'
import { TeamTable } from './TeamTable'

export function StaffBoard() {
	const { t } = useI18n()
	const board = useStaffBoard()

	return (
		<Card
			as='section'
			className='min-h-[460px] flex-auto animate-rise max-[720px]:flex-none'
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<Segmented
					aria-label={t('Раздел')}
					options={board.views}
					value={board.view}
					onChange={board.setView}
				/>
				{board.view === 'team' ? (
					<Segmented
						aria-label={t('Роль')}
						options={board.roles}
						value={board.role}
						onChange={board.setRole}
					/>
				) : (
					<div className='flex items-center gap-2'>
						<span className='text-[12.5px] text-ink-muted'>
							{t('Неделя 41 · 5 – 11 октября')}
						</span>
						<Button size='sm'>{t('Копировать прошлую')}</Button>
						<Button size='sm'>{t('Редактировать')}</Button>
					</div>
				)}
			</div>
			{board.view === 'team' ? (
				<TeamTable people={board.people} />
			) : (
				<RosterTable roster={board.roster} weekDays={board.weekDays} />
			)}
		</Card>
	)
}
