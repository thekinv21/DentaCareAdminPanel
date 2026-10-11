'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { inputClass } from '@/shared/ui/field'

import type { TConfirmDialogModel } from './useConfirmDialog'

type TTypeToConfirmFieldProps = {
	code: string
	model: TConfirmDialogModel
}

/**
 * Input where the user types a code by hand before a critical action
 */
export function TypeToConfirmField({ code, model }: TTypeToConfirmFieldProps) {
	const t = useTranslations('Confirm')

	return (
		<label className='flex flex-col gap-1.5 rounded-[14px] bg-danger-soft p-3'>
			<span className='text-[13px] leading-4.5 text-danger'>
				{t('toConfirmType')} <b className='font-mono'>{code}</b>
			</span>
			<input
				className={cn(
					inputClass,
					'font-mono',
					model.isTypedCodeValid &&
						'border-success shadow-[0_0_0_3px_var(--success-soft)]',
				)}
				autoComplete='off'
				spellCheck={false}
				placeholder={code}
				{...model.register('typed')}
			/>
		</label>
	)
}
