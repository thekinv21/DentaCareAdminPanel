'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import {
	DOCTOR_ROLE_MEMBERS,
	DOCTOR_ROLE_PERMISSIONS,
	DOCTOR_ROLE_SCOPE,
	ROLE_COLORS,
	ROLE_PRESETS,
	ROLES,
	type TPermissions,
	type TRolePreset,
	useRoleLabels,
} from '@/entities/role'

import { mockRequest } from '@/shared/api'
import { useFormat } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'
import { useConfirm } from '@/shared/ui/confirm-dialog'
import { useToast } from '@/shared/ui/toast'

import { roleFormSchema, type TRoleFormValues } from './Schema'
import { type TScope, usePermissionMatrix } from './usePermissionMatrix'

const PRESET_IDS = Object.keys(ROLE_PRESETS) as TRolePreset[]

const initialPermissions = (roleId: string): TPermissions =>
	roleId === 'doctor'
		? DOCTOR_ROLE_PERMISSIONS
		: (ROLE_PRESETS[roleId as TRolePreset]?.permissions ?? {})

/**
 * Create/edit role: name, color, starting preset and the permission matrix
 */
export function useRoleForm(roleId?: string) {
	const t = useTranslations('RoleForm')
	const tValidation = useTranslations('Validation')
	const labels = useRoleLabels()
	const format = useFormat()
	const confirm = useConfirm()
	const toast = useToast()
	const router = useRouter()
	const role = roleId ? (ROLES.find(r => r.id === roleId) ?? ROLES[2]) : null
	const isEdit = !!role
	const roleName = role ? labels.text(role.name) : ''

	const form = useForm<TRoleFormValues>({
		resolver: zodResolver(roleFormSchema),
		defaultValues: {
			name: roleName,
			description: role ? labels.text(role.description) : '',
		},
	})
	const name = useWatch({ control: form.control, name: 'name' })
	const [color, setColor] = useState(role?.color ?? ROLE_COLORS[1].color)
	const [preset, setPreset] = useState<TRolePreset>('blank')
	const [permissions, setPermissionsState] = useState<TPermissions>(
		role ? initialPermissions(role.id) : {},
	)
	const [scope, setScopeState] = useState<Record<string, TScope>>(
		role?.id === 'doctor' ? DOCTOR_ROLE_SCOPE : {},
	)
	const [dirty, setDirty] = useState(false)

	const matrix = usePermissionMatrix({
		permissions,
		setPermissions: next => {
			setPermissionsState(next)
			setDirty(true)
		},
		scope,
		setScope: (module, value) => {
			setScopeState(current => ({ ...current, [module]: value }))
			setDirty(true)
		},
	})

	const members = role?.id === 'doctor' ? DOCTOR_ROLE_MEMBERS : []
	const { errors, isSubmitting } = form.formState

	return {
		isEdit,
		title: isEdit ? t('roleNamed', { name: roleName }) : t('newRole'),
		crumbTail: isEdit ? t('editing') : t('creating'),
		previewName: name || (isEdit ? roleName : t('newRole')),
		field: (name: keyof TRoleFormValues) => ({
			'aria-invalid': !!errors[name],
			...form.register(name),
		}),
		errorOf: (name: keyof TRoleFormValues) => {
			const message = errors[name]?.message
			return message ? tValidation(message) : undefined
		},
		color,
		setColor,
		colors: ROLE_COLORS.map(c => ({
			color: c.color,
			name: labels.color(c.name),
		})),
		preset,
		presets: PRESET_IDS.map(id => ({
			id,
			label: labels.module(ROLE_PRESETS[id].label),
		})),
		applyPreset: (id: TRolePreset) => {
			setPreset(id)
			setPermissionsState(ROLE_PRESETS[id].permissions)
			setDirty(true)
		},
		matrix,
		members: members.map(m => ({
			name: format.name(m.name),
			sub: labels.module(m.sub),
			initials: m.initials,
			tone: m.tone,
		})),
		membersCount: role?.users ?? 0,
		dirtyText: dirty ? t('unsavedChanges') : t('appliesToAllWithRole'),
		saving: isSubmitting,
		save: form.handleSubmit(async () => {
			await mockRequest()
			setDirty(false)
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
						n: matrix.total,
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
