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
import { AssistantSection } from './AssistantSection'
import { BasicSection } from './BasicSection'
import { MedicSection } from './MedicSection'
import { UserFormFooter } from './UserFormFooter'

type TUserFormPageProps = { params?: Promise<{ id: string }> }

export function UserFormPage({ params }: TUserFormPageProps) {
	const userId = params ? use(params).id : undefined

	const t = useTranslations('UserForm')

	const {
		form,
		isEdit,
		title,
		breadcrumbLabel,
		types,
		roles,
		onTypeChange,
		showMedic,
		showAssistant,
		saving,
		onSubmit,
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
						className='flex min-h-0 flex-auto animate-rise'
					>
						<Card as='section' className='min-h-0 flex-auto'>
							<div className='-mx-4.5 flex min-h-0 flex-auto flex-col gap-5.5 overflow-auto px-4.5 pt-1 pb-2 scrollbar-thin'>
								<BasicSection types={types} onTypeChange={onTypeChange} />
								<AccessSection roles={roles} />
								{showMedic && <MedicSection />}
								{showAssistant && <AssistantSection />}
							</div>
							<UserFormFooter isEdit={isEdit} saving={saving} />
						</Card>
					</form>
				</FormProvider>
			</PageContent>
		</>
	)
}
