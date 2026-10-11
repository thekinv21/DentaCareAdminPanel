'use client'

import { useId } from 'react'

import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { IconButton } from '@/shared/ui/icon-button'
import { Overlay } from '@/shared/ui/modal'
import { Overline } from '@/shared/ui/overline'

import { ConfirmDetails } from './ConfirmDetails'
import { ConfirmFooter } from './ConfirmFooter'
import { ConfirmGuards } from './ConfirmGuards'
import { CONFIRM_TONE } from './ConfirmTone'
import type { TConfirmOptions } from './ConfirmTypes'
import { useConfirmDialog } from './useConfirmDialog'
import { useConfirmKeys } from './useConfirmKeys'

type TConfirmDialogProps = {
	request: TConfirmOptions
	onClose: () => void
}

export function ConfirmDialog({ request, onClose }: TConfirmDialogProps) {
	const t = useTranslations('Confirm')
	const model = useConfirmDialog(request, onClose)
	const titleId = useId()
	const tone = CONFIRM_TONE[request.tone ?? 'danger']
	const Icon = tone.icon
	const isCritical = request.tone === 'critical'
	useConfirmKeys(model.close, model.confirm)

	return (
		<Overlay onBackdrop={model.close}>
			<div
				role='alertdialog'
				aria-modal='true'
				aria-labelledby={`${titleId}-title`}
				aria-describedby={`${titleId}-desc`}
				className={cn(
					'relative flex max-h-[calc(100dvh-48px)] w-full max-w-120 animate-pop flex-col gap-4 overflow-auto rounded-3xl border border-line bg-surface p-6 shadow-float scrollbar-thin',
					isCritical && 'border-t-4 border-t-danger',
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
						{isCritical && (
							<Overline as='span' tone='danger'>
								{t('irreversible')}
							</Overline>
						)}
						<h2
							id={`${titleId}-title`}
							className='font-display text-xl leading-6.5 font-extrabold tracking-[-0.015em]'
						>
							{request.title}
						</h2>
						<p id={`${titleId}-desc`} className='leading-5.25 text-ink-muted'>
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

				<ConfirmFooter request={request} model={model} />
			</div>
		</Overlay>
	)
}
