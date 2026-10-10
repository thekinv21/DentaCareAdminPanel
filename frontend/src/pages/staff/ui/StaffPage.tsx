'use client'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { Button } from '@/shared/ui/button'

import { ON_SHIFT_NOW, TEAM_SIZE } from '../model/Roster'
import { useShiftForm } from '../model/useShiftForm'
import { useStaffOverview } from '../model/useStaffOverview'
import { ShiftModal } from './ShiftModal'
import { StaffOverview } from './StaffOverview'

export function StaffPage() {
	const t = useTranslations('Staff')
	const shiftForm = useShiftForm()
	const overview = useStaffOverview(shiftForm.openFor)

	return (
		<>
			<PageHeader
				crumb={t('pageCrumb', { total: TEAM_SIZE, onShift: ON_SHIFT_NOW })}
				title={t('staff')}
				actions={
					// staff invitations come with the backend
					<Button variant='primary' disabled>
						<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
						{t('invite')}
					</Button>
				}
			/>
			<PageContent>
				<StaffOverview overview={overview} />
			</PageContent>
			<ShiftModal shiftForm={shiftForm} />
		</>
	)
}
