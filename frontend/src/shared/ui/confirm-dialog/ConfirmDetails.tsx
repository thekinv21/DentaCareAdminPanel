'use client'

import { ConfirmBulkList } from './ConfirmBulkList'
import { ConfirmChoice } from './ConfirmChoice'
import { ConfirmImpactList } from './ConfirmImpactList'
import { ConfirmSubject } from './ConfirmSubject'
import type { TConfirmOptions } from './ConfirmTypes'
import type { TConfirmDialogModel } from './useConfirmDialog'

type TConfirmDetailsProps = {
	request: TConfirmOptions
	model: TConfirmDialogModel
}

/**
 * Who or what the action touches: subject, bulk list, impact and a choice
 */
export function ConfirmDetails({ request, model }: TConfirmDetailsProps) {
	const { subject, bulk, impact, choice } = request

	return (
		<>
			{subject && !bulk && <ConfirmSubject subject={subject} />}
			{bulk && <ConfirmBulkList bulk={bulk} />}
			{!!impact?.length && <ConfirmImpactList impact={impact} />}
			{choice && <ConfirmChoice choice={choice} control={model.control} />}
		</>
	)
}
