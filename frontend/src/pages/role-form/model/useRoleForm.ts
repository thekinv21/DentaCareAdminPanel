'use client'

import { useRouter } from 'next/navigation'

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
} from '@/entities/role'

import { mockRequest } from '@/shared/api'
import { useFormat } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'
import { useConfirm } from '@/shared/ui/confirm-dialog'
import { useToast } from '@/shared/ui/toast'

import { roleFormSchema, type TRoleFormValues } from './Schema'

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
	const format = useFormat()
	const confirm = useConfirm()
	const toast = useToast()
	const router = useRouter()
	const role = roleId ? (ROLES.find(r => r.id === roleId) ?? ROLES[2]) : null
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
		crumbTail: isEdit ? t('editing') : t('creating'),
		fallbackName: isEdit ? roleName : t('newRole'),
		colors: ROLE_COLORS.map(c => ({
			color: c.color,
			name: labels.color(c.name),
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
		members: members.map(m => ({
			name: format.name(m.name),
			sub: labels.module(m.sub),
			initials: m.initials,
			tone: m.tone,
		})),
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
				choice: {
					label: t('transferStaffTo'),
					value: 'assistant',
					items: [
						{
							id: 'assistant',
							label: t('assistant'),
							hint: t('noFinanceAccess'),
						},
						{ id: 'admin', label: t('admin'), hint: t('scheduleAndPatients') },
						{ id: 'none', label: t('leaveWithoutRole'), hint: t('cantSignIn') },
					],
				},
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
