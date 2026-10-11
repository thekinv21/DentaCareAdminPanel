'use client'

import { notFound, useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import {
	DOCTOR_ROLE_MEMBERS,
	DOCTOR_ROLE_PERMISSIONS,
	DOCTOR_ROLE_SCOPE,
	PERMISSIONS_TOTAL,
	ROLE_COLORS,
	ROLE_PRESETS,
	ROLES,
	type TPermissions,
	type TRole,
	type TRolePreset,
	useRoleLabels,
	useRoleTransferChoice,
} from '@/entities/role'

import { mockRequest } from '@/shared/api'
import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'
import { useConfirm } from '@/shared/ui/confirm-dialog'
import { useToast } from '@/shared/ui/toast'

import { roleFormSchema, type TRoleFormValues } from './RoleFormSchema'

const PRESET_IDS = Object.keys(ROLE_PRESETS) as TRolePreset[]

const initialPermissions = (role: TRole): TPermissions =>
	role.id === 'doctor'
		? DOCTOR_ROLE_PERMISSIONS
		: (ROLE_PRESETS[role.id as TRolePreset]?.permissions ?? {})

/**
 * Create/edit role: name, color, starting preset and the permission matrix
 */
export function useRoleForm(roleId?: string) {
	const t = useTranslations('RoleForm')
	const labels = useRoleLabels()
	const transferChoice = useRoleTransferChoice()
	const format = useFormat()
	const confirm = useConfirm()
	const toast = useToast()
	const router = useRouter()
	const role = roleId
		? ROLES.find(candidate => candidate.id === roleId)
		: undefined
	// an unknown id must never open (and let the user edit) another role
	if (roleId && !role) notFound()
	const isEdit = !!role
	const roleName = role ? labels.text(role.name) : ''

	const methods = useForm<TRoleFormValues>({
		resolver: zodResolver(roleFormSchema),
		defaultValues: {
			name: roleName,
			description: role ? labels.text(role.description) : '',
			color: role?.color ?? ROLE_COLORS[1].color,
			preset: 'blank',
			permissions: role ? initialPermissions(role) : {},
			scope: role?.id === 'doctor' ? DOCTOR_ROLE_SCOPE : {},
		},
	})
	const { isDirty, isSubmitting } = methods.formState
	const members = role?.id === 'doctor' ? DOCTOR_ROLE_MEMBERS : []

	return {
		methods,
		isEdit,
		title: isEdit ? t('roleNamed', { name: roleName }) : t('newRole'),
		fallbackName: isEdit ? roleName : t('newRole'),
		colors: ROLE_COLORS.map(swatch => ({
			color: swatch.color,
			name: labels.color(swatch.name),
		})),
		presets: PRESET_IDS.map(id => ({
			id,
			label: labels.module(ROLE_PRESETS[id].label),
		})),
		applyPreset: (id: TRolePreset) => {
			methods.setValue('preset', id)
			methods.setValue('permissions', ROLE_PRESETS[id].permissions, {
				shouldDirty: true,
			})
		},
		members: members.map(member => {
			const name = format.name(member.name)
			return {
				name,
				subtitle: labels.module(member.sub),
				initials: getInitials(name),
				tone: member.tone,
			}
		}),
		membersCount: role?.users ?? 0,
		dirtyText: isDirty ? t('unsavedChanges') : t('appliesToAllWithRole'),
		saving: isSubmitting,
		submit: methods.handleSubmit(async values => {
			await mockRequest()
			methods.reset(values)
			toast.show(isEdit ? t('rolePermissionsUpdated') : t('roleCreated'))
			if (!isEdit) router.push(ROUTES.roles)
		}),
		remove: () =>
			confirm({
				tone: 'danger',
				title: t('deleteRoleNamedQuestion', { name: roleName }),
				description: t('deleteRoleChoiceDescription', { n: role?.users ?? 0 }),
				choice: transferChoice,
				impact: [
					{
						tone: 'warning',
						n: role?.users ?? 0,
						text: t('impactStaffChangeRole'),
					},
					{
						tone: 'neutral',
						n: PERMISSIONS_TOTAL,
						text: t('impactPermissionsRemoved'),
					},
				],
				confirmText: t('deleteRole'),
				pendingText: t('deleting'),
				successText: t('roleDeletedReassigned'),
				onConfirm: () => mockRequest().then(() => router.push(ROUTES.roles)),
			}),
	}
}

export type TRoleFormModel = ReturnType<typeof useRoleForm>
