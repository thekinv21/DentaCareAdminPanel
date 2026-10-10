'use client'

import Link from 'next/link'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { ROUTES } from '@/shared/routes'
import { Badge } from '@/shared/ui/badge'
import { buttonClass } from '@/shared/ui/button'
import { Card, CardHeader } from '@/shared/ui/card'

import { useRoleCards } from '../model/useRoleCards'
import { RoleCard } from './RoleCard'

export function RolesPage() {
	const t = useTranslations('Roles')
	const { cards, countText } = useRoleCards()

	return (
		<>
			<PageHeader
				crumb={t('adminStaffPermissions')}
				title={t('rolesAndAccess')}
				actions={
					<Link
						href={ROUTES.roleNew}
						className={buttonClass({ variant: 'primary' })}
					>
						<Plus size={17} strokeWidth={2.2} aria-hidden='true' />
						{t('createRole')}
					</Link>
				}
			/>
			<PageContent>
				<Card as='section' className='min-h-0 flex-auto animate-rise'>
					<CardHeader
						title={t('rolesDefineAccess')}
						description={t('rolesDefineAccessHint')}
						actions={<Badge>{countText}</Badge>}
					/>
					<div className='grid grid-cols-3 gap-3.5 pb-1.5 max-laptop:grid-cols-2 max-mobile:grid-cols-1'>
						{cards.map(role => (
							<RoleCard key={role.id} role={role} />
						))}
					</div>
				</Card>
			</PageContent>
		</>
	)
}
