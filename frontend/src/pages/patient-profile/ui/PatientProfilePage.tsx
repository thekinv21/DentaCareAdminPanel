import type { Metadata } from 'next'
import Link from 'next/link'

import { Play } from 'lucide-react'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { ROUTES } from '@/shared/routes'
import { Button } from '@/shared/ui/button'

import { PatientProfileView } from './PatientProfileView'

export const metadata: Metadata = { title: 'Карта пациента' }

interface PatientProfilePageProps {
	params: Promise<{ id: string }>
}

export async function PatientProfilePage({ params }: PatientProfilePageProps) {
	const { id } = await params

	return (
		<>
			<PageHeader
				crumb={
					<nav aria-label='Breadcrumb'>
						<Link
							href={ROUTES.patients}
							className='text-inherit no-underline hover:text-ink'
						>
							Пациенты
						</Link>
						<span aria-hidden='true' className='px-1.5'>
							/
						</span>
						<span className='font-mono'>{decodeURIComponent(id)}</span>
					</nav>
				}
				title='Карта пациента'
				actions={
					<Button variant='primary'>
						<Play size={15} fill='currentColor' aria-hidden='true' />
						Начать приём
					</Button>
				}
			/>
			<PageContent>
				<PatientProfileView />
			</PageContent>
		</>
	)
}
