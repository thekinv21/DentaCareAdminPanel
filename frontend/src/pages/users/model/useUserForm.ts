'use client'

import { notFound, useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import {
	type TUserType,
	USER_TYPE,
	USERS,
	useUserLabels,
} from '@/entities/user'

import { mockRequest } from '@/shared/api'
import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'
import { useToast } from '@/shared/ui/toast'

import { isMedic, type TUserFormValues, userFormSchema } from './UserFormSchema'
import { EMPTY_USER_VALUES, toFormValues } from './UserFormValues'
import { useUserDangerActions } from './useUserDangerActions'

/**
 * Create/edit user form: type-dependent sections, the role that defines the
 * permissions preview, and the danger actions of an existing user
 */
export function useUserForm(userId?: string) {
	const t = useTranslations('UserForm')
	const labels = useUserLabels()
	const format = useFormat()
	const toast = useToast()
	const router = useRouter()
	const user = userId
		? USERS.find(candidate => candidate.id === userId)
		: undefined
	// an unknown id must never open (and let the user edit) somebody else
	if (userId && !user) notFound()
	const isEdit = !!user

	const methods = useForm<TUserFormValues>({
		resolver: zodResolver(userFormSchema),
		defaultValues: user ? toFormValues(user) : EMPTY_USER_VALUES,
	})
	const type = useWatch({ control: methods.control, name: 'type' })

	const fullName = user ? format.name(user.fullName) : t('newEmployee')
	const danger = useUserDangerActions({
		subject: {
			title: fullName,
			subtitle: user ? `${labels.type(type)} · ${user.email}` : '',
			initials: getInitials(fullName),
			tone: user?.tone,
		},
		phone: user?.phone ?? '',
		onDeactivated: () => methods.setValue('switches.accountActive', false),
		onDeleted: () => router.push(ROUTES.users),
	})

	return {
		...danger,
		methods,
		isEdit,
		title: isEdit ? fullName : t('newUser'),
		breadcrumbLabel: isEdit ? t('editing') : t('creating'),
		changeType: (next: TUserType) => {
			methods.setValue('type', next)
			methods.setValue(
				'role',
				next === 'chief' && isEdit ? 'owner' : USER_TYPE[next].role,
			)
		},
		visibleSections: {
			medic: isMedic(type),
			chief: type === 'chief',
			assistant: type === 'assistant',
			admin: type === 'admin',
			accountant: type === 'accountant',
			schedule: isMedic(type) || type === 'assistant',
		},
		preview: {
			name: fullName,
			subtitle: user ? user.phone : t('fillNameAndPhone'),
			initials: user ? getInitials(fullName) : '+',
			tone: user?.tone ?? ('neutral' as const),
		},
		saving: methods.formState.isSubmitting,
		submit: methods.handleSubmit(async () => {
			await mockRequest()
			toast.show(isEdit ? t('changesSaved') : t('userCreatedInviteSent'))
			if (!isEdit) router.push(ROUTES.users)
		}),
	}
}

export type TUserFormModel = ReturnType<typeof useUserForm>
