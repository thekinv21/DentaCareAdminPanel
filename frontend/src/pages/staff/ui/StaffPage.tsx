import type { Metadata } from 'next'

import { Plus } from 'lucide-react'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { Button } from '@/shared/ui/button'

import { StaffBoard } from './StaffBoard'

export const metadata: Metadata = { title: 'Сотрудники' }

export function StaffPage() {
	return (
		<>
			<PageHeader
				crumb='12 сотрудников · 9 на смене сейчас'
				title='Сотрудники'
				actions={
					<Button variant='primary'>
						<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
						Пригласить
					</Button>
				}
			/>
			<PageContent>
				<StaffBoard />
			</PageContent>
		</>
	)
}
