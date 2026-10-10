'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { Button } from '@/shared/ui/button'
import { Spinner } from '@/shared/ui/spinner'

import { CONFIRM_TONE } from './ConfirmTone'
import type { TConfirmOptions } from './ConfirmTypes'
import type { TConfirmDialogModel } from './useConfirmDialog'

const kbdClass =
	'rounded-[5px] border border-line bg-raised px-1.25 font-mono text-[10.5px] leading-4 text-ink-muted'

type TConfirmFooterProps = {
	request: TConfirmOptions
	model: TConfirmDialogModel
}

/**
 * Keyboard hints and the dialog buttons; after a partial bulk failure it
 * offers "Done" and "Retry failed" instead
 */
export function ConfirmFooter({ request, model }: TConfirmFooterProps) {
	const t = useTranslations('Confirm')
	const tone = CONFIRM_TONE[request.tone ?? 'danger']

	return (
		<div className='mt-1 flex items-center gap-2.5'>
			<span
				aria-hidden='true'
				className='flex min-w-0 flex-1 items-center gap-x-3 overflow-hidden text-[11.5px] whitespace-nowrap text-ink-subtle max-mobile:hidden'
			>
				<span>
					<kbd className={kbdClass}>Esc</kbd> {t('escCancel')}
				</span>
				<span>
					<kbd className={kbdClass}>Enter</kbd> {t(tone.enter)}
				</span>
			</span>
			<div className='ml-auto flex shrink-0 gap-2.5'>
				{model.bulk.failed ? (
					<>
						<Button onClick={model.finishPartial}>{t('done')}</Button>
						<Button variant={tone.button} onClick={model.retryFailed}>
							{t('retryFor', { n: model.bulk.failed.length })}
						</Button>
					</>
				) : (
					<>
						<Button
							autoFocus
							onClick={model.close}
							aria-disabled={model.pending}
						>
							{request.cancelText ?? t('cancel')}
						</Button>
						<Button
							variant={tone.button}
							onClick={model.confirm}
							aria-busy={model.pending}
							aria-disabled={!model.canConfirm && !model.pending}
							className={cn(model.pending && 'pointer-events-none')}
						>
							{model.pending && <Spinner />}
							{model.confirmLabel}
						</Button>
					</>
				)}
			</div>
		</div>
	)
}
