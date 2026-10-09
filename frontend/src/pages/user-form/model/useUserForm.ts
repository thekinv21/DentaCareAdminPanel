'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import type { TSystemRoleId } from '@/entities/role'
import {
	type TUser,
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

import {
	DEFAULT_CHOICES,
	DEFAULT_SWITCHES,
	type TUserChoices,
	type TUserSwitch,
} from './Options'
import { isMedic, type TUserFormValues, userFormSchema } from './Schema'
import { useUserDangerActions } from './useUserDangerActions'

const EMPTY: TUserFormValues = {
	type: 'doctor',
	lastName: '',
	firstName: '',
	middleName: '',
	phone: '',
	email: '',
	birthDate: '',
	branch: 'alaToo',
	license: '',
	experience: '',
	revenuePercent: '30',
	chair: 'chair1',
	qualification: 'dentalAssistant',
	discountLimit: '10',
	till: 'till1',
	exportFormat: 'xlsx',
	reportBranches: 'allBranches',
	workStart: '09:00',
	workEnd: '18:00',
}

/**
 * Mock profile details the list doesn't carry (until GET /users/:id exists)
 */
function valuesOf(user: TUser): TUserFormValues {
	const [firstName, lastName] = user.fullName.split(' ')
	return {
		...EMPTY,
		type: user.type,
		lastName,
		firstName,
		middleName: 'Николаевич',
		phone: user.phone.replace('+996 ', ''),
		email: user.email,
		birthDate: '14.05.1985',
		branch: user.branch,
		license: 'СТ-0457',
		experience: '15',
		revenuePercent: '35',
		chair: 'chair2',
	}
}

/**
 * Create/edit user form: validated fields, type-dependent sections, chips
 * and switches, plus the role that defines the permissions preview
 */
export function useUserForm(userId?: string) {
	const t = useTranslations('UserForm')
	const tValidation = useTranslations('Validation')
	const labels = useUserLabels()
	const format = useFormat()
	const toast = useToast()
	const router = useRouter()
	const user = userId ? (USERS.find(u => u.id === userId) ?? USERS[1]) : null
	const isEdit = !!user

	const form = useForm<TUserFormValues>({
		resolver: zodResolver(userFormSchema),
		defaultValues: user ? valuesOf(user) : EMPTY,
	})
	const { errors, isSubmitting } = form.formState
	const type = useWatch({ control: form.control, name: 'type' })
	const [role, setRole] = useState<TSystemRoleId | null>(user?.role ?? null)
	const [choices, setChoices] = useState<TUserChoices>(DEFAULT_CHOICES)
	const [switches, setSwitches] = useState(DEFAULT_SWITCHES)

	const fullName = user ? format.name(user.fullName) : t('newEmployee')
	const danger = useUserDangerActions({
		subject: {
			title: fullName,
			subtitle: user ? `${labels.type(type)} · ${user.email}` : '',
			initials: getInitials(fullName),
			tone: user?.tone,
		},
		phone: user?.phone ?? '',
		onDeactivated: () => setSwitches(s => ({ ...s, active: false })),
		onDeleted: () => router.push(ROUTES.users),
	})

	return {
		isEdit,
		title: isEdit ? fullName : t('newUser'),
		crumbTail: isEdit ? t('editing') : t('creating'),
		type,
		setType: (next: TUserType) => {
			form.setValue('type', next)
			setRole(null)
		},
		show: {
			medic: isMedic(type),
			chief: type === 'chief',
			assistant: type === 'assistant',
			admin: type === 'admin',
			accountant: type === 'accountant',
			schedule: isMedic(type) || type === 'assistant',
		},
		role: role ?? (type === 'chief' && isEdit ? 'owner' : USER_TYPE[type].role),
		setRole,
		choices,
		choose: <K extends keyof TUserChoices>(key: K, value: TUserChoices[K]) =>
			setChoices(current => ({ ...current, [key]: value })),
		switches,
		flip: (key: TUserSwitch) => (value: boolean) =>
			setSwitches(current => ({ ...current, [key]: value })),
		field: (name: keyof TUserFormValues) => ({
			'aria-invalid': !!errors[name],
			...form.register(name),
		}),
		errorOf: (name: keyof TUserFormValues) => {
			const message = errors[name]?.message
			return message ? tValidation(message) : undefined
		},
		preview: {
			name: fullName,
			sub: user ? user.phone : t('fillNameAndPhone'),
			initials: user ? getInitials(fullName) : '+',
			tone: user?.tone ?? ('neutral' as const),
		},
		saving: isSubmitting,
		save: form.handleSubmit(async () => {
			await mockRequest()
			toast.show(isEdit ? t('changesSaved') : t('userCreatedInviteSent'))
			if (!isEdit) router.push(ROUTES.users)
		}),
		...danger,
	}
}

export type TUserFormModel = ReturnType<typeof useUserForm>
