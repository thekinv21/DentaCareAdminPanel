'use client'

import { useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { useToast } from '@/shared/ui/toast'

import type { TConfirmOptions, TConfirmPayload } from './ConfirmTypes'
import { useBulkRun } from './useBulkRun'

const messageOf = (error: unknown) =>
	error instanceof Error ? error.message : String(error)

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
				(request.options ?? []).map(o => [o.id, !!o.checked]),
			),
			typed: '',
		},
	})
	const [reason, reasonText, typed] = useWatch({
		control: fields.control,
		name: ['reason', 'reasonText', 'typed'],
	})
	const [left, setLeft] = useState(request.countdown ?? 0)
	const [pending, setPending] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (left <= 0) return
		const id = setTimeout(() => setLeft(value => value - 1), 1000)
		return () => clearTimeout(id)
	}, [left])

	const typeOk =
		!request.typeToConfirm ||
		typed.trim().toUpperCase() === request.typeToConfirm.toUpperCase()
	const reasonOk = !request.reasonRequired || !!reason || !!reasonText.trim()
	const canConfirm = typeOk && reasonOk && left <= 0 && !pending

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
			if (await step()) await finish()
		} catch (cause) {
			setError(messageOf(cause))
		} finally {
			setPending(false)
		}
	}

	const confirm = () => {
		if (!canConfirm) return
		attempt(() => bulk.run(request.bulk?.items ?? []))
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
				: left > 0
					? `${request.confirmText} · ${left}`
					: request.confirmText,
		control: fields.control,
		register: fields.register,
		typeOk,
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
