'use client'

import { useTranslations } from 'next-intl'
import { Controller } from 'react-hook-form'

import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Segmented } from '@/shared/ui/segmented'

import type { TStaffBoardModel } from '../model/useStaffBoard'
import { RosterTable } from './RosterTable'
import { TeamTable } from './TeamTable'

type TStaffBoardProps = { board: TStaffBoardModel }

export function StaffBoard({ board }: TStaffBoardProps) {
	const t = useTranslations('Staff')

	return (
		<Card
			as='section'
			className='min-h-115 flex-auto animate-rise max-[720px]:flex-none'
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<Segmented
					aria-label={t('section')}
					options={board.views}
					value={board.view}
					onChange={board.setView}
				/>
				{board.view === 'team' ? (
					<Controller
						control={board.filters.control}
						name='role'
						render={({ field }) => (
							<Segmented
								aria-label={t('role')}
								options={board.roles}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
				) : (
					<div className='flex items-center gap-2'>
						<span className='text-[12.5px] text-ink-muted'>
							{t('week41October5')}
						</span>
						<Button size='sm'>{t('copyPrevious')}</Button>
						<Button size='sm'>{t('edit')}</Button>
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
