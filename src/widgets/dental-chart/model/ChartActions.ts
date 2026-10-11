import type { TChartMap, TToolId, TToothState } from './Teeth'

export function applyTool(tooth: TToothState, tool: TToolId): TToothState {
	const next: TToothState = { ...tooth, surfaces: { ...tooth.surfaces } }
	switch (tool) {
		case 'car':
		case 'fill':
			next.surfaces.c = next.surfaces.c === tool ? undefined : tool
			return next
		case 'crown':
			return { ...next, crown: !next.crown }
		case 'endo':
			return { ...next, endo: !next.endo }
		case 'implant':
			return { ...next, implant: !next.implant, missing: false }
		case 'extract':
			return { ...next, extract: !next.extract }
		case 'missing':
			return { surfaces: {}, missing: !tooth.missing }
		case 'clear':
			return { surfaces: {} }
		default:
			return tooth
	}
}

export type TChartCounts = Record<
	'car' | 'fill' | 'crown' | 'endo' | 'implant' | 'extract' | 'missing',
	number
>

export function summarize(chart: TChartMap): TChartCounts {
	const count = {
		car: 0,
		fill: 0,
		crown: 0,
		endo: 0,
		implant: 0,
		extract: 0,
		missing: 0,
	}
	Object.values(chart).forEach(tooth => {
		const findings = Object.values(tooth.surfaces)
		if (findings.includes('car')) count.car++
		if (findings.includes('fill')) count.fill++
		if (tooth.crown) count.crown++
		if (tooth.endo) count.endo++
		if (tooth.implant) count.implant++
		if (tooth.extract) count.extract++
		if (tooth.missing) count.missing++
	})
	return count
}
