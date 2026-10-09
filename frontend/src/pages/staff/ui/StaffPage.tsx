'use client'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { Button } from '@/shared/ui/button'

import { StaffBoard } from './StaffBoard'

export function StaffPage() {
	const t = useTranslations('Staff')
	return (
		<>
			<PageHeader
				crumb={t('n12Staff9On')}
				title={t('staff')}
				actions={
					<Button variant='primary'>
						<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
						{t('invite')}
					</Button>
				}
			/>
			<PageContent>
				<StaffBoard />
			</PageContent>
		</>
	)
}
