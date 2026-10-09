'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { applyTool, summarize } from './ChartActions'
import {
	INITIAL_CHART,
	PERMANENT_LOWER,
	PERMANENT_UPPER,
	PRIMARY_LOWER,
	PRIMARY_UPPER,
	type TChartMap,
	type TDentition,
	TOOTH_NOTES,
	type TSurface,
	type TToolId,
	type TToothState,
} from './Teeth'
import { useToothLabels } from './useToothLabels'

const EMPTY: TToothState = { surfaces: {} }

/**
 * Chart state for both dentitions, the active tool and the selected tooth
 */
export function useDentalChart() {
	const t = useTranslations('DentalChart')
	const [dentition, setDentition] = useState<TDentition>('permanent')
	const [tool, setTool] = useState<TToolId>('select')
	const [selected, setSelected] = useState(46)
	const [charts, setCharts] = useState<Record<TDentition, TChartMap>>({
		permanent: INITIAL_CHART,
		primary: {},
	})

	const chart = charts[dentition]
	const permanent = dentition === 'permanent'
	const stateOf = (n: number) => chart[n] ?? EMPTY

	const updateTooth = (
		n: number,
		update: (tooth: TToothState) => TToothState,
	) => {
		setCharts(current => ({
			...current,
			[dentition]: {
				...current[dentition],
				[n]: update(current[dentition][n] ?? EMPTY),
			},
		}))
		setSelected(n)
	}

	const pickTooth = (n: number) => {
		if (tool === 'select') setSelected(n)
		else updateTooth(n, tooth => applyTool(tooth, tool))
	}

	const pickSurface = (n: number, surface: TSurface) => {
		if (tool !== 'car' && tool !== 'fill') return pickTooth(n)
		updateTooth(n, tooth => ({
			...tooth,
			surfaces: {
				...tooth.surfaces,
				[surface]: tooth.surfaces[surface] === tool ? undefined : tool,
			},
		}))
	}

	const cycleSurface = (surface: TSurface) =>
		updateTooth(selected, tooth => {
			const current = tooth.surfaces[surface]
			const next = !current ? 'car' : current === 'car' ? 'fill' : undefined
			return { ...tooth, surfaces: { ...tooth.surfaces, [surface]: next } }
		})

	const switchDentition = (next: TDentition) => {
		setDentition(next)
		setSelected(next === 'permanent' ? 46 : 84)
	}

	const labels = useToothLabels(stateOf)
	const selectedState = stateOf(selected)

	return {
		dentition,
		switchDentition,
		permanent,
		tool,
		setTool,
		selected,
		upper: permanent ? PERMANENT_UPPER : PRIMARY_UPPER,
		lower: permanent ? PERMANENT_LOWER : PRIMARY_LOWER,
		stateOf,
		pickTooth,
		pickSurface,
		cycleSurface,
		clearSelected: () => updateTooth(selected, () => ({ surfaces: {} })),
		selectedState,
		counts: summarize(chart),
		tags: labels.tagsOf(selectedState),
		note:
			permanent && TOOTH_NOTES[selected]
				? t(TOOTH_NOTES[selected])
				: t('noNotesAddA'),
		...labels,
	}
}

export type TDentalChartModel = ReturnType<typeof useDentalChart>
