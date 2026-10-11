'use client'

import { ArrowLeftRight, Package } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FormProvider } from 'react-hook-form'

import { Alert } from '@/shared/ui/alert'
import { ChoiceChips } from '@/shared/ui/choice-chips'
import { Field } from '@/shared/ui/field'
import { Modal, ModalFooter } from '@/shared/ui/modal'
import { SubjectTile } from '@/shared/ui/subject-tile'

import { MOVEMENT_TYPES } from '../model/StockFormSchema'
import type { TStockMovementModel } from '../model/useStockMovement'
import { StockMovementFields } from './StockMovementFields'

type TStockMovementModalProps = { movement: TStockMovementModel }

export function StockMovementModal({ movement }: TStockMovementModalProps) {
	const t = useTranslations('StockForm')

	return (
		<FormProvider {...movement.methods}>
			<Modal
				open={movement.open}
				onClose={movement.close}
				onSubmit={movement.submit}
				busy={movement.saving}
				icon={<ArrowLeftRight size={20} aria-hidden='true' />}
				title={t('movementTitle')}
				subtitle={t('movementSubtitle')}
				footer={
					<ModalFooter
						onCancel={movement.close}
						saving={movement.saving}
						savingLabel={t('posting')}
						submitLabel={t('post')}
					/>
				}
			>
				<SubjectTile
					media={
						<span className='inline-flex size-9.5 items-center justify-center rounded-xl bg-surface text-brand-strong'>
							<Package size={18} aria-hidden='true' />
						</span>
					}
					title={movement.name}
					caption={movement.stockLine}
				/>
				<Field as='div' label={t('operation')}>
					<ChoiceChips
						aria-label={t('operation')}
						options={MOVEMENT_TYPES.map(movementType => ({
							id: movementType,
							label: t(`movement_${movementType}`),
						}))}
						value={movement.type}
						onChange={movement.changeType}
					/>
				</Field>
				<StockMovementFields reasonLabel={movement.reasonLabel} />
				<Alert tone='info' size='sm'>
					{t('stockAfter')}{' '}
					<b className='font-mono'>{movement.stockAfterText}</b>
				</Alert>
			</Modal>
		</FormProvider>
	)
}
