'use client'

import { notFound, useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { ROLE_OPTIONS } from '@/entities/role'
import {
	type TUserType,
	USER_TYPE,
	USER_TYPES,
	USERS,
	useUserLabels,
} from '@/entities/user'

import { mockRequest } from '@/shared/api'
import { useFormat } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'
import { useToast } from '@/shared/ui/toast'

import { isMedic, type TUserFormValues, userFormSchema } from './UserFormSchema'
import { EMPTY_USER_VALUES, toFormValues } from './UserFormValues'

export function useUserForm(userId?: string) {
	const t = useTranslations('UserForm')

	const labels = useUserLabels()

	const format = useFormat()

	const toast = useToast()

	const router = useRouter()

	const user = userId
		? USERS.find(candidate => candidate.id === userId)
		: undefined

	if (userId && !user) notFound()

	const isEdit = !!user

	const form = useForm<TUserFormValues>({
		resolver: zodResolver(userFormSchema),
		defaultValues: user ? toFormValues(user) : EMPTY_USER_VALUES,
	})

	const type = useWatch({ control: form.control, name: 'type' })

	const title = user ? format.name(user.fullName) : t('newUser')

	const breadcrumbLabel = isEdit ? t('editing') : t('creating')

	const saving = form.formState.isSubmitting

	const types = USER_TYPES.map(id => ({ id, label: labels.type(id) }))

	const roles = ROLE_OPTIONS

	const showMedic = isMedic(type)

	const showAssistant = type === 'assistant'

	const onTypeChange = (next: TUserType) => {
		form.setValue('type', next)

		form.setValue('role', USER_TYPE[next].role)
	}

	const onSubmit = form.handleSubmit(async () => {
		await mockRequest()

		toast.show(isEdit ? t('changesSaved') : t('userCreated'))

		router.push(ROUTES.users)
	})

	return {
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
	}
}

export type TUserFormModel = ReturnType<typeof useUserForm>
