'use client'

import { useEffect, useRef, useState } from 'react'

import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { errorMessage } from '@/shared/lib/error'
import { useToast } from '@/shared/ui/toast'

import type { TConfirmOptions, TConfirmPayload } from './ConfirmTypes'
import { useBulkRun } from './useBulkRun'

/**
 * What the user fills in before confirming; everything but `typed` goes to `onConfirm`
 */
type TConfirmFields = TConfirmPayload & { typed: string }

/**
 * Guards (typed code, reason, countdown), the pending request and its
 * outcome for one open confirmation dialog
 */
export function useConfirmDialog(request: TConfirmOptions, close: () => void) {
	const t = useTranslations('Confirm')
	const toast = useToast()
	const bulk = useBulkRun(request.bulk)
	const fields = useForm<TConfirmFields>({
		defaultValues: {
			choice: request.choice?.value ?? null,
			reason: null,
			reasonText: '',
			options: Object.fromEntries(
				(request.options ?? []).map(option => [option.id, !!option.checked]),
			),
			typed: '',
		},
	})
	const [reason, reasonText, typed] = useWatch({
		control: fields.control,
		name: ['reason', 'reasonText', 'typed'],
	})
	const [secondsLeft, setSecondsLeft] = useState(request.countdown ?? 0)
	const [pending, setPending] = useState(false)
	const [error, setError] = useState<string | null>(null)
	// the bulk part already ran in full; a retry only repeats `onConfirm`
	const bulkCompleted = useRef(false)

	useEffect(() => {
		if (secondsLeft <= 0) return
		const timeoutId = setTimeout(() => setSecondsLeft(value => value - 1), 1000)
		return () => clearTimeout(timeoutId)
	}, [secondsLeft])

	const isTypedCodeValid =
		!request.typeToConfirm ||
		typed.trim().toUpperCase() === request.typeToConfirm.toUpperCase()
	const isReasonGiven =
		!request.reasonRequired || !!reason || !!reasonText.trim()
	const canConfirm =
		isTypedCodeValid && isReasonGiven && secondsLeft <= 0 && !pending

	const finish = async () => {
		const { choice, reason, reasonText, options } = fields.getValues()
		await request.onConfirm?.({ choice, reason, reasonText, options })
		bulk.settle()
		close()
		toast.show(
			request.successText ?? t('done'),
			request.undo && {
				onUndo: request.undo.onUndo,
				undoText: request.undo.text,
			},
		)
	}

	const attempt = async (step: () => Promise<boolean>) => {
		setPending(true)
		setError(null)
		try {
			if (await step()) {
				bulkCompleted.current = true
				await finish()
			}
		} catch (cause) {
			setError(errorMessage(cause))
		} finally {
			setPending(false)
		}
	}

	const confirm = () => {
		if (!canConfirm) return
		attempt(() =>
			bulkCompleted.current
				? Promise.resolve(true)
				: bulk.run(request.bulk?.items ?? []),
		)
	}

	const pendingText = request.bulk
		? `${request.pendingText ?? t('working')} ${bulk.done}/${bulk.total}`
		: (request.pendingText ?? t('pleaseWait'))

	return {
		pending,
		error,
		canConfirm,
		confirm,
		close: () => !pending && close(),
		confirmLabel: pending
			? pendingText
			: error
				? t('retry')
				: secondsLeft > 0
					? `${request.confirmText} · ${secondsLeft}`
					: request.confirmText,
		control: fields.control,
		register: fields.register,
		isTypedCodeValid,
		bulk,
		showProgress: !!request.bulk && (pending || !!bulk.failed),
		retryFailed: () => attempt(bulk.retry),
		finishPartial: () => {
			bulk.settle()
			close()
			toast.show(t('processedOf', { done: bulk.done, total: bulk.total }), {
				tone: 'warning',
			})
		},
	}
}

export type TConfirmDialogModel = ReturnType<typeof useConfirmDialog>
