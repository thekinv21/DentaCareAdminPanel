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
import { RoleDangerZone } from './RoleDangerZone'
import { RoleFormFooter } from './RoleFormFooter'
import { RoleSummary } from './RoleSummary'

type TRoleFormPageProps = { params?: Promise<{ id: string }> }

export function RoleFormPage({ params }: TRoleFormPageProps) {
	const roleId = params ? use(params).id : undefined

	const t = useTranslations('RoleForm')

	const {
		form,
		isEdit,
		title,
		breadcrumbLabel,
		fallbackName,
		colors,
		presets,
		onPresetChange,
		members,
		membersCount,
		dirtyText,
		saving,
		onSubmit,
		onDelete,
	} = useRoleForm(roleId)

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
						className='flex min-h-0 flex-auto animate-rise gap-4 max-laptop:flex-col'
					>
						<Card as='section' className='min-h-0 min-w-0 flex-auto gap-0 p-0'>
							<div className='flex min-h-0 flex-auto flex-col gap-5.5 overflow-auto px-5.5 py-5 scrollbar-thin'>
								<RoleBasics
									isEdit={isEdit}
									colors={colors}
									presets={presets}
									onPresetChange={onPresetChange}
								/>
								<PermissionMatrix />
								{isEdit && (
									<RoleDangerZone
										roleName={fallbackName}
										membersCount={membersCount}
										onDelete={onDelete}
									/>
								)}
							</div>
							<RoleFormFooter
								isEdit={isEdit}
								saving={saving}
								statusText={dirtyText}
							/>
						</Card>
						<RoleSummary
							fallbackName={fallbackName}
							members={members}
							membersCount={membersCount}
						/>
					</form>
				</FormProvider>
			</PageContent>
		</>
	)
}
