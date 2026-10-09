export type TSurface = 'm' | 'd' | 'b' | 'o' | 'c'
export type TSurfaceFinding = 'car' | 'fill'

export type TToothState = {
	surfaces: Partial<Record<TSurface, TSurfaceFinding>>
	crown?: boolean
	endo?: boolean
	implant?: boolean
	missing?: boolean
	extract?: boolean
	plan?: boolean
}

export type TChartMap = Record<number, TToothState>

export type TDentition = 'permanent' | 'primary'

export type TToolId =
	| 'select'
	| 'car'
	| 'fill'
	| 'crown'
	| 'endo'
	| 'implant'
	| 'extract'
	| 'missing'
	| 'clear'

export const SURFACES: TSurface[] = ['m', 'd', 'b', 'o', 'c']

export const SURFACE_NAME: Record<TSurface, string> = {
	m: 'mesial',
	d: 'distal',
	b: 'buccal',
	o: 'lingual',
	c: 'occlusal',
}

export const SURFACE_SHORT: Record<TSurface, string> = {
	m: 'm',
	d: 'd',
	b: 'b',
	o: 'l',
	c: 'o',
}

export const TOOLS: {
	id: TToolId
	label: string
	swatch: string
	hint: string
}[] = [
	{
		id: 'select',
		label: 'selection',
		swatch: 'bg-surface border-[1.5px] border-ink-muted',
		hint: 'selectTooth',
	},
	{
		id: 'car',
		label: 'caries',
		swatch: 'bg-caries',
		hint: 'clickASurface',
	},
	{
		id: 'fill',
		label: 'fillingTag',
		swatch: 'bg-info',
		hint: 'clickASurface',
	},
	{
		id: 'crown',
		label: 'crownTag',
		swatch: 'bg-info-soft border-[3px] border-info',
		hint: 'clickATooth',
	},
	{
		id: 'endo',
		label: 'rootCanals',
		swatch: 'bg-danger',
		hint: 'treatedRootCanals',
	},
	{
		id: 'implant',
		label: 'implantTag',
		swatch: 'bg-sunken border-[1.5px] border-ink-muted',
		hint: 'clickATooth',
	},
	{
		id: 'extract',
		label: 'delete',
		swatch: 'bg-accent-soft border-[1.5px] border-accent',
		hint: 'scheduleExtraction',
	},
	{
		id: 'missing',
		label: 'missingTag',
		swatch: 'bg-transparent border-[1.5px] border-dashed border-line-strong',
		hint: 'clickATooth',
	},
	{
		id: 'clear',
		label: 'eraser',
		swatch: 'bg-raised border border-line',
		hint: 'resetTooth',
	},
]

export const PERMANENT_UPPER = [
	18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
]
export const PERMANENT_LOWER = [
	48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
]
export const PRIMARY_UPPER = [55, 54, 53, 52, 51, 61, 62, 63, 64, 65]
export const PRIMARY_LOWER = [85, 84, 83, 82, 81, 71, 72, 73, 74, 75]

/**
 * Mock chart of patient DN-20418 (last updated 12.09.2026)
 */
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
