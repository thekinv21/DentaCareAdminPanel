'use client'

import { use } from 'react'

import Link from 'next/link'

import { Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { ROUTES } from '@/shared/routes'
import { Button, buttonClass } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { DangerZone } from '@/shared/ui/danger-zone'
import { FormSection } from '@/shared/ui/form-section'
import { Spinner } from '@/shared/ui/spinner'

import { useRoleForm } from '../model/useRoleForm'
import { PermissionMatrix } from './PermissionMatrix'
import { RoleBasics } from './RoleBasics'
import { RoleSummary } from './RoleSummary'

type TRoleFormPageProps = { params?: Promise<{ id: string }> }

export function RoleFormPage({ params }: TRoleFormPageProps) {
	const id = params ? use(params).id : undefined
	const t = useTranslations('RoleForm')
	const tCommon = useTranslations('Common')
	const form = useRoleForm(id)

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
						/ {form.crumbTail}
					</>
				}
				title={form.title}
			/>
			<PageContent>
				<form
					noValidate
					onSubmit={form.save}
					className='flex min-h-0 flex-auto animate-rise gap-4 max-[1100px]:flex-col'
				>
					<Card as='section' className='min-h-0 min-w-0 flex-auto gap-0 p-0'>
						<div className='flex min-h-0 flex-auto flex-col gap-5.5 overflow-auto px-5.5 py-5 scrollbar-thin'>
							<RoleBasics form={form} />
							<PermissionMatrix matrix={form.matrix} />
							{form.isEdit && (
								<FormSection title={t('dangerZone')} danger>
									<DangerZone
										title={t('deleteRoleNamed', { name: form.previewName })}
										description={t('deleteRoleNote', { n: form.membersCount })}
										actions={
											<Button variant='destructive' onClick={form.remove}>
												<Trash2 size={16} aria-hidden='true' />
												{t('deleteRole')}
											</Button>
										}
									/>
								</FormSection>
							)}
						</div>
						<div className='flex shrink-0 flex-wrap items-center gap-2.5 rounded-b-[20px] border-t border-line bg-raised px-5.5 py-3.5'>
							<span className='mr-auto text-[12.5px] text-ink-muted'>
								{form.dirtyText}
							</span>
							<Link href={ROUTES.roles} className={buttonClass()}>
								{tCommon('cancel')}
							</Link>
							<Button type='submit' variant='primary' aria-busy={form.saving}>
								{form.saving && <Spinner />}
								{form.saving
									? tCommon('saving')
									: form.isEdit
										? t('saveChanges')
										: t('createRole')}
							</Button>
						</div>
					</Card>
					<RoleSummary form={form} />
				</form>
			</PageContent>
		</>
	)
}
