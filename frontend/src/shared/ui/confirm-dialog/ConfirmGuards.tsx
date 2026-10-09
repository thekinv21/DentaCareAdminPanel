'use client'

import { Check, TriangleAlert } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { ChoiceChips } from '@/shared/ui/choice-chips'
import { inputClass, textareaClass } from '@/shared/ui/field'

import { sectionLabelClass } from './ConfirmTone'
import type { TConfirmOptions } from './ConfirmTypes'
import type { TConfirmDialogModel } from './useConfirmDialog'

type TConfirmGuardsProps = {
	request: TConfirmOptions
	model: TConfirmDialogModel
}

/**
 * Inputs that gate the confirm button, plus progress and errors
 */
export function ConfirmGuards({ request, model }: TConfirmGuardsProps) {
	const t = useTranslations('Confirm')
	const { reasons, options, typeToConfirm, progressText } = request
	const reasonLabel = request.reasonRequired ? t('reasonRequired') : t('reason')

	return (
		<>
			{reasons && (
				<div className='flex flex-col gap-2'>
					<span className={sectionLabelClass}>{reasonLabel}</span>
					<ChoiceChips
						aria-label={reasonLabel}
						options={reasons.map(reason => ({ id: reason, label: reason }))}
						value={model.reason}
						onChange={model.toggleReason}
					/>
					<textarea
						className={cn(textareaClass, 'min-h-14')}
						placeholder={t('commentOptional')}
						value={model.reasonText}
						onChange={event => model.setReasonText(event.target.value)}
					/>
				</div>
			)}
			{!!options?.length && (
				<div className='flex flex-col gap-0.5'>
					{options.map(option => {
						const on = !!model.options[option.id]
						return (
							<button
								key={option.id}
								type='button'
								role='checkbox'
								aria-checked={on}
								onClick={() => model.toggleOption(option.id)}
								className='flex items-start gap-2.5 border-0 bg-transparent py-1.5 text-left text-ink'
							>
								<span
									className={cn(
										'inline-flex size-5 shrink-0 items-center justify-center rounded-md border-[1.5px]',
										on
											? 'border-brand bg-brand text-on-brand'
											: 'border-line-strong bg-surface text-transparent',
									)}
								>
									<Check size={13} strokeWidth={3} aria-hidden='true' />
								</span>
								<span>
									<span className='block font-semibold'>{option.label}</span>
									{option.hint && (
										<span className='block text-[12.5px] text-ink-muted'>
											{option.hint}
										</span>
									)}
								</span>
							</button>
						)
					})}
				</div>
			)}
			{typeToConfirm && (
				<label className='flex flex-col gap-1.5 rounded-[14px] bg-danger-soft p-3'>
					<span className='text-[13px] leading-4.5 text-danger'>
						{t('toConfirmType')} <b className='font-mono'>{typeToConfirm}</b>
					</span>
					<input
						className={cn(
							inputClass,
							'font-mono',
							model.typeOk &&
								'border-success shadow-[0_0_0_3px_var(--success-soft)]',
						)}
						autoComplete='off'
						spellCheck={false}
						placeholder={typeToConfirm}
						value={model.typed}
						onChange={event => model.setTyped(event.target.value)}
					/>
				</label>
			)}
			{model.showProgress && (
				<div role='status' className='flex flex-col gap-1.5'>
					<div className='flex justify-between text-[13px]'>
						<span className='font-semibold'>
							{progressText ?? t('processed')} {model.bulk.done} {t('of')}{' '}
							{model.bulk.total}
						</span>
						<span className='font-mono text-ink-muted'>
							{model.bulk.percent}%
						</span>
					</div>
					<div className='h-2 overflow-hidden rounded-full bg-sunken'>
						<span
							className='block h-full rounded-full bg-brand transition-[width] duration-150 ease-linear'
							style={{ width: `${model.bulk.percent}%` }}
						/>
					</div>
				</div>
			)}
			{model.bulk.failed && (
				<div
					role='alert'
					className='flex flex-col gap-1.5 rounded-xl bg-danger-soft px-3 py-2.5 text-[13px] leading-4.75 font-semibold text-danger'
				>
					<span className='flex gap-2'>
						<TriangleAlert size={16} aria-hidden='true' className='mt-px' />
						{t('failedOf', {
							failed: model.bulk.failed.length,
							total: model.bulk.total,
						})}
					</span>
					{model.bulk.failed.map(failure => (
						<span key={failure.item.id} className='pl-6 font-medium'>
							{failure.item.name} — {failure.error}
						</span>
					))}
				</div>
			)}
			{model.error && (
				<div
					role='alert'
					className='flex items-start gap-2 rounded-xl bg-danger-soft px-3 py-2.5 text-[13px] leading-4.75 font-semibold text-danger'
				>
					<TriangleAlert
						size={16}
						aria-hidden='true'
						className='mt-px shrink-0'
					/>
					<span>{model.error}</span>
				</div>
			)}
		</>
	)
}
