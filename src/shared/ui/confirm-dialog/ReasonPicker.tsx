'use client'

import { useTranslations } from 'next-intl'
import { useController } from 'react-hook-form'

import { cn } from '@/shared/lib/cn'
import { ChoiceChips } from '@/shared/ui/choice-chips'
import { textareaClass } from '@/shared/ui/field'

import { ConfirmSection } from './ConfirmSection'
import type { TConfirmDialogModel } from './useConfirmDialog'

type TReasonPickerProps = {
	reasons: string[]
	isRequired: boolean
	model: TConfirmDialogModel
}

/**
 * Reason chips (a second click clears the chip) plus a free comment
 */
export function ReasonPicker({
	reasons,
	isRequired,
	model,
}: TReasonPickerProps) {
	const t = useTranslations('Confirm')
	const { field } = useController({ control: model.control, name: 'reason' })
	const label = isRequired ? t('reasonRequired') : t('reason')

	return (
		<ConfirmSection label={label}>
			<ChoiceChips
				aria-label={label}
				options={reasons.map(reason => ({ id: reason, label: reason }))}
				value={field.value}
				onChange={reason =>
					field.onChange(field.value === reason ? null : reason)
				}
			/>
			<textarea
				className={cn(textareaClass, 'min-h-14')}
				placeholder={t('commentOptional')}
				{...model.register('reasonText')}
			/>
		</ConfirmSection>
	)
}
