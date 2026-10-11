'use client'

import { notFound, useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { ROLE_COLORS, ROLES, useRoleLabels } from '@/entities/role'

import { mockRequest } from '@/shared/api'
import { ROUTES } from '@/shared/routes'
import { useToast } from '@/shared/ui/toast'

import { roleFormSchema, type TRoleFormValues } from './RoleFormSchema'

/**
 * Create/edit role: name, color, description and the permission matrix
 */
export function useRoleForm(roleId?: string) {
	const t = useTranslations('RoleForm')

	const labels = useRoleLabels()

	const toast = useToast()

	const router = useRouter()

	const role = roleId
		? ROLES.find(candidate => candidate.id === roleId)
		: undefined

	// an unknown id must never open (and let the user edit) another role
	if (roleId && !role) notFound()

	const isEdit = !!role

	const roleName = role ? labels.text(role.name) : ''

	const form = useForm<TRoleFormValues>({
		resolver: zodResolver(roleFormSchema),
		defaultValues: {
			name: roleName,
			description: role ? labels.text(role.description) : '',
			color: role?.color ?? ROLE_COLORS[1].color,
			permissions: role?.permissions ?? {},
		},
	})

	const saving = form.formState.isSubmitting

	const title = isEdit ? t('roleNamed', { name: roleName }) : t('newRole')

	const breadcrumbLabel = isEdit ? t('editing') : t('creating')

	const colors = ROLE_COLORS.map(swatch => ({
		color: swatch.color,
		name: labels.color(swatch.name),
	}))

	const onSubmit = form.handleSubmit(async () => {
		await mockRequest()

		toast.show(isEdit ? t('rolePermissionsUpdated') : t('roleCreated'))

		router.push(ROUTES.roles)
	})

	return { form, isEdit, title, breadcrumbLabel, colors, saving, onSubmit }
}

export type TRoleFormModel = ReturnType<typeof useRoleForm>
