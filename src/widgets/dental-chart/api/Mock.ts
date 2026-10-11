import type { TChartMap } from '../model/Teeth'

/**
 * Mock chart of patient DN-20418 until the backend exposes /patients/:id/chart
 */
export const CHART_UPDATED_ON = '12.09.2026'

export const INITIAL_CHART: TChartMap = {
	46: { surfaces: { d: 'car', c: 'car' }, plan: true },
	47: { surfaces: { c: 'car' } },
	36: { surfaces: { d: 'fill' } },
	16: { surfaces: {}, crown: true, endo: true },
	21: { surfaces: {}, crown: true, endo: true },
	26: { surfaces: { d: 'car', c: 'car' }, plan: true },
	25: { surfaces: { m: 'fill' } },
	14: { surfaces: { c: 'fill' }, plan: true },
	38: { surfaces: {}, extract: true, plan: true },
	37: { surfaces: {}, implant: true, crown: true },
	18: { surfaces: {}, missing: true },
	48: { surfaces: {}, missing: true },
}

export const TOOTH_NOTES: Record<number, string> = {
	46: 'deepDistalCariesInvolving',
	26: 'cariesOnTheDistal',
	38: 'partiallyEruptedRecurrentPericoronitis',
	37: 'implantWithCrownPlaced',
	16: 'metalCeramicCrownRoot',
	21: 'ceramicCrownAfterTrauma',
	14: 'wornFillingPlanReplace',
}
