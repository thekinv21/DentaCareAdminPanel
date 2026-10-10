'use client'

import { use } from 'react'

import Link from 'next/link'

import { useTranslations } from 'next-intl'
import { FormProvider } from 'react-hook-form'

import { PageContent, PageHeader } from '@/widgets/page-header'

import { ROUTES } from '@/shared/routes'
import { Card } from '@/shared/ui/card'

import { useUserForm } from '../model/useUserForm'
import { AccessSection } from './AccessSection'
import { AccountantSection } from './AccountantSection'
import { AdminSection } from './AdminSection'
import { AssistantSection } from './AssistantSection'
import { BasicSection } from './BasicSection'
import { MedicSection } from './MedicSection'
import { ScheduleSection } from './ScheduleSection'
import { UserDangerZone } from './UserDangerZone'
import { UserFormFooter } from './UserFormFooter'
import { UserPreview } from './UserPreview'
import { UserTypePicker } from './UserTypePicker'

type TUserFormPageProps = { params?: Promise<{ id: string }> }

export function UserFormPage({ params }: TUserFormPageProps) {
	const userId = params ? use(params).id : undefined

	const t = useTranslations('UserForm')

	const {
		form,
		isEdit,
		title,
		breadcrumbLabel,
		onTypeChange,
		visibleSections: sections,
		preview,
		saving,
		onSubmit,
		onResetPassword,
		onDeactivate,
		onDelete,
	} = useUserForm(userId)

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
								<UserTypePicker onChange={onTypeChange} />
								<BasicSection />
								<AccessSection
									isEdit={isEdit}
									onResetPassword={onResetPassword}
								/>
								{sections.medic && <MedicSection isChief={sections.chief} />}
								{sections.assistant && <AssistantSection />}
								{sections.admin && <AdminSection />}
								{sections.accountant && <AccountantSection />}
								{sections.schedule && <ScheduleSection />}
								{isEdit && (
									<UserDangerZone
										onDeactivate={onDeactivate}
										onDelete={onDelete}
									/>
								)}
							</div>
							<UserFormFooter isEdit={isEdit} saving={saving} />
						</Card>
						<UserPreview preview={preview} />
					</form>
				</FormProvider>
			</PageContent>
		</>
	)
}
