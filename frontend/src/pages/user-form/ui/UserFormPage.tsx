'use client'

import { use } from 'react'

import Link from 'next/link'

import { Ban, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { ROUTES } from '@/shared/routes'
import { Button, buttonClass } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { DangerZone } from '@/shared/ui/danger-zone'
import { FormSection } from '@/shared/ui/form-section'
import { Spinner } from '@/shared/ui/spinner'

import { useUserForm } from '../model/useUserForm'
import { AccessSection } from './AccessSection'
import { AccountantSection } from './AccountantSection'
import { AdminSection } from './AdminSection'
import { AssistantSection } from './AssistantSection'
import { BasicSection } from './BasicSection'
import { MedicSection } from './MedicSection'
import { ScheduleSection } from './ScheduleSection'
import { UserPreview } from './UserPreview'
import { UserTypePicker } from './UserTypePicker'

type TUserFormPageProps = { params?: Promise<{ id: string }> }

export function UserFormPage({ params }: TUserFormPageProps) {
	const id = params ? use(params).id : undefined
	const t = useTranslations('UserForm')
	const tCommon = useTranslations('Common')
	const form = useUserForm(id)

	return (
		<>
			<PageHeader
				crumb={
					<>
						<Link
							href={ROUTES.users}
							className='text-inherit no-underline hover:underline'
						>
							{t('users')}
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
							<UserTypePicker form={form} />
							<BasicSection form={form} />
							<AccessSection form={form} />
							{form.show.medic && <MedicSection form={form} />}
							{form.show.assistant && <AssistantSection form={form} />}
							{form.show.admin && <AdminSection form={form} />}
							{form.show.accountant && <AccountantSection form={form} />}
							{form.show.schedule && <ScheduleSection form={form} />}
							{form.isEdit && (
								<FormSection title={t('dangerZone')} danger>
									<DangerZone
										title={t('deleteUser')}
										description={t('deleteUserNote')}
										actions={
											<>
												<Button variant='dangerGhost' onClick={form.deactivate}>
													<Ban size={16} aria-hidden='true' />
													{t('deactivate')}
												</Button>
												<Button variant='destructive' onClick={form.remove}>
													<Trash2 size={16} aria-hidden='true' />
													{t('delete')}
												</Button>
											</>
										}
									/>
								</FormSection>
							)}
						</div>
						<div className='flex shrink-0 flex-wrap items-center gap-2.5 rounded-b-[20px] border-t border-line bg-raised px-5.5 py-3.5'>
							<span className='mr-auto text-[12.5px] text-ink-muted'>
								{tCommon('requiredFieldsNote')}
							</span>
							<Link href={ROUTES.users} className={buttonClass()}>
								{tCommon('cancel')}
							</Link>
							<Button type='submit' variant='primary' aria-busy={form.saving}>
								{form.saving && <Spinner />}
								{form.saving
									? tCommon('saving')
									: form.isEdit
										? t('saveChanges')
										: t('createUser')}
							</Button>
						</div>
					</Card>
					<UserPreview form={form} />
				</form>
			</PageContent>
		</>
	)
}
