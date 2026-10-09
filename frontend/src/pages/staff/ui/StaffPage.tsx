'use client'

import { Plus } from 'lucide-react'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { useI18n } from '@/shared/lib/i18n'
import { Button } from '@/shared/ui/button'

import { StaffBoard } from './StaffBoard'

export function StaffPage() {
	const { t } = useI18n()
	return (
		<>
			<PageHeader
				crumb={t('12 сотрудников · 9 на смене сейчас')}
				title={t('Сотрудники')}
				actions={
					<Button variant='primary'>
						<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
						{t('Пригласить')}
					</Button>
				}
			/>
			<PageContent>
				<StaffBoard />
			</PageContent>
		</>
	)
}
