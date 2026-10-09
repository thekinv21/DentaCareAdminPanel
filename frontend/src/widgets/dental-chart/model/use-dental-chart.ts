'use client'

import { useState } from 'react'

import { useI18n } from '@/shared/lib/i18n'

import { applyTool, summarize } from './chart-actions'
import {
	type ChartMap,
	type Dentition,
	INITIAL_CHART,
	PERMANENT_LOWER,
	PERMANENT_UPPER,
	PRIMARY_LOWER,
	PRIMARY_UPPER,
	type Surface,
	type ToolId,
	TOOTH_NOTES,
	type ToothState,
} from './teeth'
import { useToothLabels } from './use-tooth-labels'

const EMPTY: ToothState = { surfaces: {} }

/**
 * Chart state for both dentitions, the active tool and the selected tooth
 */
export function useDentalChart() {
	const { t } = useI18n()
	const [dentition, setDentition] = useState<Dentition>('permanent')
	const [tool, setTool] = useState<ToolId>('select')
	const [selected, setSelected] = useState(46)
	const [charts, setCharts] = useState<Record<Dentition, ChartMap>>({
		permanent: INITIAL_CHART,
		primary: {},
	})

	const chart = charts[dentition]
	const permanent = dentition === 'permanent'
	const stateOf = (n: number) => chart[n] ?? EMPTY

	const updateTooth = (
		n: number,
		update: (tooth: ToothState) => ToothState,
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

	const pickSurface = (n: number, surface: Surface) => {
		if (tool !== 'car' && tool !== 'fill') return pickTooth(n)
		updateTooth(n, tooth => ({
			...tooth,
			surfaces: {
				...tooth.surfaces,
				[surface]: tooth.surfaces[surface] === tool ? undefined : tool,
			},
		}))
	}

	const cycleSurface = (surface: Surface) =>
		updateTooth(selected, tooth => {
			const current = tooth.surfaces[surface]
			const next = !current ? 'car' : current === 'car' ? 'fill' : undefined
			return { ...tooth, surfaces: { ...tooth.surfaces, [surface]: next } }
		})

	const switchDentition = (next: Dentition) => {
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
				: t('Заметок нет. Добавьте находку инструментами выше.'),
		...labels,
	}
}

export type DentalChartModel = ReturnType<typeof useDentalChart>
