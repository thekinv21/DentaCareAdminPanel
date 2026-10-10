'use client'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

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

import { isMedic, type TUserFormValues, userFormSchema } from './Schema'
import { useUserDangerActions } from './useUserDangerActions'

const EMPTY: TUserFormValues = {
	type: 'doctor',
	role: USER_TYPE.doctor.role,
	lastName: '',
	firstName: '',
	middleName: '',
	phone: '',
	email: '',
	birthDate: '',
	branch: 'alaToo',
	language: 'ru',
	gender: 'm',
	specialties: ['orth', 'impl'],
	license: '',
	experience: '',
	revenuePercent: '30',
	chair: 'chair1',
	duration: 60,
	color: '#1D5DA3',
	doctors: ['pet'],
	qualification: 'dentalAssistant',
	payments: ['visa', 'mbank', 'komp', 'opt'],
	discountLimit: '10',
	till: 'till1',
	reports: ['rev', 'debt', 'bank'],
	exportFormat: 'xlsx',
	reportBranches: 'allBranches',
	days: ['mon', 'tue', 'thu', 'fri', 'sat'],
	workStart: '09:00',
	workEnd: '18:00',
	switches: {
		invite: true,
		tfa: true,
		active: true,
		online: true,
		sign: false,
		stock: true,
		chart: false,
		cancel: true,
		refund: false,
		bank: true,
		close: true,
	},
}

/**
 * Mock profile details the list doesn't carry (until GET /users/:id exists)
 */
function valuesOf(user: TUser): TUserFormValues {
	const [firstName, lastName] = user.fullName.split(' ')
	return {
		...EMPTY,
		type: user.type,
		role: user.role,
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
 * Create/edit user form: type-dependent sections, the role that defines the
 * permissions preview, and the danger actions of an existing user
 */
export function useUserForm(userId?: string) {
	const t = useTranslations('UserForm')
	const labels = useUserLabels()
	const format = useFormat()
	const toast = useToast()
	const router = useRouter()
	const user = userId ? (USERS.find(u => u.id === userId) ?? USERS[1]) : null
	const isEdit = !!user

	const methods = useForm<TUserFormValues>({
		resolver: zodResolver(userFormSchema),
		defaultValues: user ? valuesOf(user) : EMPTY,
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
		onDeactivated: () => methods.setValue('switches.active', false),
		onDeleted: () => router.push(ROUTES.users),
	})

	return {
		...danger,
		methods,
		isEdit,
		title: isEdit ? fullName : t('newUser'),
		crumbTail: isEdit ? t('editing') : t('creating'),
		changeType: (next: TUserType) => {
			methods.setValue('type', next)
			methods.setValue(
				'role',
				next === 'chief' && isEdit ? 'owner' : USER_TYPE[next].role,
			)
		},
		show: {
			medic: isMedic(type),
			chief: type === 'chief',
			assistant: type === 'assistant',
			admin: type === 'admin',
			accountant: type === 'accountant',
			schedule: isMedic(type) || type === 'assistant',
		},
		preview: {
			name: fullName,
			sub: user ? user.phone : t('fillNameAndPhone'),
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
