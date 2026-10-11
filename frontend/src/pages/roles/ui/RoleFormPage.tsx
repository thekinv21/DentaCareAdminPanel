'use client'

import { use } from 'react'

import Link from 'next/link'

import { useTranslations } from 'next-intl'
import { FormProvider } from 'react-hook-form'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { ROUTES } from '@/shared/routes'
import { Card } from '@/shared/ui/card'

import { useRoleForm } from '../model/useRoleForm'
import { PermissionMatrix } from './PermissionMatrix'
import { RoleBasics } from './RoleBasics'
import { RoleFormFooter } from './RoleFormFooter'

type TRoleFormPageProps = { params?: Promise<{ id: string }> }

export function RoleFormPage({ params }: TRoleFormPageProps) {
	const roleId = params ? use(params).id : undefined

	const t = useTranslations('RoleForm')

	const { form, isEdit, title, breadcrumbLabel, colors, saving, onSubmit } =
		useRoleForm(roleId)

	return (
		<>
			<PageHeader
				crumb={
					<>
						<Link
							href={ROUTES.roles}
							className='text-inherit no-underline hover:underline'
						>
							{t('rolesAndAccess')}
						</Link>{' '}
						/ {breadcrumbLabel}
					</>
				}
				title={title}
			/>
			<PageContent>
				<FormProvider {...form}>
					<form
						noValidate
						onSubmit={onSubmit}
						className='flex min-h-0 flex-auto animate-rise'
					>
						<Card as='section' className='min-h-0 flex-auto'>
							<div className='-mx-4.5 flex min-h-0 flex-auto flex-col gap-5.5 overflow-auto px-4.5 pt-1 pb-2 scrollbar-thin'>
								<RoleBasics colors={colors} />
								<PermissionMatrix />
							</div>
							<RoleFormFooter isEdit={isEdit} saving={saving} />
						</Card>
					</form>
				</FormProvider>
			</PageContent>
		</>
	)
}
