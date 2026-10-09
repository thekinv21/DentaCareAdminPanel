'use client'

import { useId } from 'react'

import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { Button } from '@/shared/ui/button'
import { IconButton } from '@/shared/ui/icon-button'
import { Overlay, useEscapeKey } from '@/shared/ui/modal'
import { Spinner } from '@/shared/ui/spinner'

import { ConfirmDetails } from './ConfirmDetails'
import { ConfirmGuards } from './ConfirmGuards'
import { CONFIRM_TONE } from './ConfirmTone'
import type { TConfirmOptions } from './ConfirmTypes'
import { useConfirmDialog } from './useConfirmDialog'
import { useEnterKey } from './useEnterKey'

const kbdClass =
	'rounded-[5px] border border-line bg-raised px-1.25 font-mono text-[10.5px] leading-4 text-ink-muted'

type TConfirmDialogProps = {
	request: TConfirmOptions
	onClose: () => void
}

export function ConfirmDialog({ request, onClose }: TConfirmDialogProps) {
	const t = useTranslations('Confirm')
	const model = useConfirmDialog(request, onClose)
	const id = useId()
	const tone = CONFIRM_TONE[request.tone ?? 'danger']
	const Icon = tone.icon
	const critical = request.tone === 'critical'
	useEscapeKey(true, model.close)
	useEnterKey(model.confirm)

	return (
		<Overlay onBackdrop={model.close}>
			<div
				role='alertdialog'
				aria-modal='true'
				aria-labelledby={`${id}-title`}
				aria-describedby={`${id}-desc`}
				className={cn(
					'relative flex max-h-[calc(100dvh-48px)] w-full max-w-120 animate-pop flex-col gap-4 overflow-auto rounded-3xl border border-line bg-surface p-6 shadow-float scrollbar-thin',
					critical && 'border-t-4 border-t-danger',
				)}
			>
				<div className='flex items-start gap-3.5'>
					<span
						className={cn(
							'flex size-12 shrink-0 items-center justify-center rounded-2xl',
							tone.iconClass,
						)}
					>
						<Icon size={22} aria-hidden='true' />
					</span>
					<div className='flex min-w-0 flex-1 flex-col gap-1.5'>
						{critical && (
							<span className='text-[11px] leading-3.5 font-bold tracking-[0.06em] text-danger uppercase'>
								{t('irreversible')}
							</span>
						)}
						<h2
							id={`${id}-title`}
							className='font-display text-xl leading-6.5 font-extrabold tracking-[-0.015em]'
						>
							{request.title}
						</h2>
						<p id={`${id}-desc`} className='leading-5.25 text-ink-muted'>
							{request.description}
						</p>
					</div>
					<IconButton
						quiet
						size='sm'
						aria-label={t('close')}
						aria-disabled={model.pending}
						onClick={model.close}
					>
						<X size={16} aria-hidden='true' />
					</IconButton>
				</div>

				<ConfirmDetails request={request} model={model} />
				<ConfirmGuards request={request} model={model} />

				<div className='mt-1 flex items-center gap-2.5'>
					<span
						aria-hidden='true'
						className='flex min-w-0 flex-1 items-center gap-x-3 overflow-hidden text-[11.5px] whitespace-nowrap text-ink-subtle max-[720px]:hidden'
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
			</div>
		</Overlay>
	)
}
