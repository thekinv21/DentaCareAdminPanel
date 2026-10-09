import { FOMS_SHARE, type TPlanFormInput } from '../model/PlanFormSchema'

type TStageDraft = Partial<TPlanFormInput['stages'][number]> | undefined

const toNumber = (value: unknown) => Number(value) || 0

/**
 * Line sums and plan totals: discount per stage, then the ФОМС share
 */
export function planTotals(stages: TStageDraft[]) {
	const lines = stages.map(stage => {
		const gross = toNumber(stage?.qty) * toNumber(stage?.price)
		const discount = Math.round((gross * toNumber(stage?.discount)) / 100)
		const foms = stage?.foms ? Math.round((gross - discount) * FOMS_SHARE) : 0
		return { gross, discount, foms, net: gross - discount }
	})
	const sumOf = (key: 'gross' | 'discount' | 'foms') =>
		lines.reduce((total, line) => total + line[key], 0)
	const sum = sumOf('gross')
	const discount = sumOf('discount')
	const foms = sumOf('foms')

	return { lines, sum, discount, foms, total: sum - discount - foms }
}
