'use client'

import { Ban, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/shared/ui/button'
import { DangerZone } from '@/shared/ui/danger-zone'
import { FormSection } from '@/shared/ui/form-section'

type TUserDangerZoneProps = {
	onDeactivate: () => void
	onDelete: () => void
}

export function UserDangerZone({
	onDeactivate,
	onDelete,
}: TUserDangerZoneProps) {
	const t = useTranslations('UserForm')

	return (
		<FormSection title={t('dangerZone')} danger>
			<DangerZone
				title={t('deleteUser')}
				description={t('deleteUserNote')}
				actions={
					<>
						<Button variant='dangerGhost' onClick={onDeactivate}>
							<Ban size={16} aria-hidden='true' />
							{t('deactivate')}
						</Button>
						<Button variant='danger' onClick={onDelete}>
							<Trash2 size={16} aria-hidden='true' />
							{t('delete')}
						</Button>
					</>
				}
			/>
		</FormSection>
	)
}
