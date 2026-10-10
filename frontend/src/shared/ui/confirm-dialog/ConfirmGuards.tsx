'use client'

import { Alert } from '@/shared/ui/alert'

import { BulkFailures } from './BulkFailures'
import { BulkProgress } from './BulkProgress'
import { ConfirmCheckOptions } from './ConfirmCheckOptions'
import type { TConfirmOptions } from './ConfirmTypes'
import { ReasonPicker } from './ReasonPicker'
import { TypeToConfirmField } from './TypeToConfirmField'
import type { TConfirmDialogModel } from './useConfirmDialog'

type TConfirmGuardsProps = {
	request: TConfirmOptions
	model: TConfirmDialogModel
}

/**
 * Inputs that gate the confirm button, plus progress and errors
 */
export function ConfirmGuards({ request, model }: TConfirmGuardsProps) {
	const { reasons, options, typeToConfirm, progressText } = request

	return (
		<>
			{reasons && (
				<ReasonPicker
					reasons={reasons}
					isRequired={!!request.reasonRequired}
					model={model}
				/>
			)}
			{!!options?.length && (
				<ConfirmCheckOptions options={options} control={model.control} />
			)}
			{typeToConfirm && (
				<TypeToConfirmField code={typeToConfirm} model={model} />
			)}
			{model.showProgress && (
				<BulkProgress bulk={model.bulk} progressText={progressText} />
			)}
			{model.bulk.failed && (
				<BulkFailures failures={model.bulk.failed} total={model.bulk.total} />
			)}
			{model.error && (
				<Alert tone='danger' size='sm' className='font-semibold'>
					{model.error}
				</Alert>
			)}
		</>
	)
}
