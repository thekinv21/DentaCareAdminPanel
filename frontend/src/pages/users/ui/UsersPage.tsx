'use client'

import Link from 'next/link'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { ROUTES } from '@/shared/routes'
import { buttonClass } from '@/shared/ui/button'

import { useUsersTable } from '../model/useUsersTable'
import { UsersTable } from './UsersTable'

export function UsersPage() {
	const t = useTranslations('Users')
	const table = useUsersTable()

	return (
		<>
			<PageHeader
				crumb={table.crumb}
				title={t('users')}
				actions={
					<Link
						href={ROUTES.userNew}
						className={buttonClass({ variant: 'primary' })}
					>
						<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
						{t('addUser')}
					</Link>
				}
			/>
			<PageContent>
				<UsersTable table={table} />
			</PageContent>
		</>
	)
}
