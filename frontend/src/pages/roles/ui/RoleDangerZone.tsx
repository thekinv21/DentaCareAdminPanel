'use client'

import { Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/shared/ui/button'
import { DangerZone } from '@/shared/ui/danger-zone'
import { FormSection } from '@/shared/ui/form-section'

type TRoleDangerZoneProps = {
	roleName: string
	membersCount: number
	onDelete: () => void
}

export function RoleDangerZone(props: TRoleDangerZoneProps) {
	const { roleName, membersCount, onDelete } = props

	const t = useTranslations('RoleForm')
	return (
		<FormSection title={t('dangerZone')} danger>
			<DangerZone
				title={t('deleteRoleNamed', { name: roleName })}
				description={t('deleteRoleNote', { n: membersCount })}
				actions={
					<Button variant='danger' onClick={onDelete}>
						<Trash2 size={16} aria-hidden='true' />
						{t('deleteRole')}
					</Button>
				}
			/>
		</FormSection>
	)
}
