'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Segmented, SegmentedField } from '@/shared/ui/segmented'

import type { TStaffOverviewModel } from '../model/useStaffOverview'
import { RosterTable } from './RosterTable'
import { TeamTable } from './TeamTable'

type TStaffOverviewProps = { overview: TStaffOverviewModel }

/**
 * Switches between the team list and the weekly shift roster
 */
export function StaffOverview({ overview }: TStaffOverviewProps) {
	const t = useTranslations('Staff')

	return (
		<Card
			as='section'
			className='min-h-115 flex-auto animate-rise max-mobile:flex-none'
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<Segmented
					aria-label={t('section')}
					options={overview.views}
					value={overview.view}
					onChange={overview.setView}
				/>
				{overview.view === 'team' ? (
					<SegmentedField
						control={overview.filters.control}
						name='role'
						aria-label={t('role')}
						options={overview.roles}
					/>
				) : (
					<div className='flex items-center gap-2'>
						<span className='text-[12.5px] text-ink-muted'>
							{overview.weekRange}
						</span>
						{/* roster copy and bulk edit come with the backend */}
						<Button size='sm' disabled>
							{t('copyPrevious')}
						</Button>
						<Button size='sm' disabled>
							{t('edit')}
						</Button>
					</div>
				)}
			</div>
			{overview.view === 'team' ? (
				<TeamTable people={overview.people} />
			) : (
				<RosterTable roster={overview.roster} weekDays={overview.weekDays} />
			)}
		</Card>
	)
}
