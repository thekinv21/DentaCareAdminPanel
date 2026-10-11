'use client'

import { useCallback, useMemo, useState } from 'react'

import { useTranslations } from 'next-intl'

import { INITIAL_CHART, TOOTH_NOTES } from '../api/Mock'
import { applyTool, summarize } from './ChartActions'
import {
	HEALTHY_TOOTH,
	PERMANENT_LOWER,
	PERMANENT_UPPER,
	PRIMARY_LOWER,
	PRIMARY_UPPER,
	type TChartMap,
	type TDentition,
	type TSurface,
	type TToolId,
	type TToothState,
} from './Teeth'
import { useToothLabels } from './useToothLabels'

/**
 * Tooth selected when a dentition opens: the first molar with findings
 */
const DEFAULT_SELECTED_TOOTH: Record<TDentition, number> = {
	permanent: 46,
	primary: 84,
}

const SURFACE_TOOLS: TToolId[] = ['car', 'fill']

/**
 * Chart state for both dentitions, the active tool and the selected tooth
 */
export function useDentalChart() {
	const t = useTranslations('DentalChart')
	const labels = useToothLabels()

	const [dentition, setDentition] = useState<TDentition>('permanent')
	const [tool, setTool] = useState<TToolId>('select')

	const [selectedTooth, setSelectedTooth] = useState(
		DEFAULT_SELECTED_TOOTH.permanent,
	)
	const [charts, setCharts] = useState<Record<TDentition, TChartMap>>({
		permanent: INITIAL_CHART,
		primary: {},
	})

	const dentitionChart = charts[dentition]
	const isPermanent = dentition === 'permanent'

	const updateTooth = useCallback(
		(toothNumber: number, update: (tooth: TToothState) => TToothState) => {
			setCharts(current => ({
				...current,
				[dentition]: {
					...current[dentition],
					[toothNumber]: update(
						current[dentition][toothNumber] ?? HEALTHY_TOOTH,
					),
				},
			}))
			setSelectedTooth(toothNumber)
		},
		[dentition],
	)

	// stable between clicks, so memoized teeth re-render only when their own state changes
	const pickTooth = useCallback(
		(toothNumber: number) => {
			if (tool === 'select') setSelectedTooth(toothNumber)
			else updateTooth(toothNumber, tooth => applyTool(tooth, tool))
		},
		[tool, updateTooth],
	)

	const pickSurface = useCallback(
		(toothNumber: number, surface: TSurface) => {
			if (!SURFACE_TOOLS.includes(tool)) return pickTooth(toothNumber)
			updateTooth(toothNumber, tooth => ({
				...tooth,
				surfaces: {
					...tooth.surfaces,
					[surface]: tooth.surfaces[surface] === tool ? undefined : tool,
				},
			}))
		},
		[tool, pickTooth, updateTooth],
	)

	const cycleSurface = (surface: TSurface) =>
		updateTooth(selectedTooth, tooth => {
			const current = tooth.surfaces[surface]
			const next = !current ? 'car' : current === 'car' ? 'fill' : undefined
			return { ...tooth, surfaces: { ...tooth.surfaces, [surface]: next } }
		})

	const switchDentition = (next: TDentition) => {
		setDentition(next)
		setSelectedTooth(DEFAULT_SELECTED_TOOTH[next])
	}

	const selectedState = dentitionChart[selectedTooth] ?? HEALTHY_TOOTH
	const counts = useMemo(() => summarize(dentitionChart), [dentitionChart])
	const noteKey = isPermanent ? TOOTH_NOTES[selectedTooth] : undefined

	return {
		dentition,
		switchDentition,
		isPermanent,
		tool,
		setTool,
		selectedTooth,
		selectedName: labels.toothName(selectedTooth),
		selectedState,
		selectedTags: labels.tagsOf(selectedState),
		selectedNote: noteKey ? t(noteKey) : t('noToothNotes'),
		upperTeeth: isPermanent ? PERMANENT_UPPER : PRIMARY_UPPER,
		lowerTeeth: isPermanent ? PERMANENT_LOWER : PRIMARY_LOWER,
		dentitionChart,
		pickTooth,
		pickSurface,
		cycleSurface,
		clearSelected: () => updateTooth(selectedTooth, () => ({ surfaces: {} })),
		counts,
		surfaceAbbreviation: labels.surfaceAbbreviation,
	}
}

export type TDentalChartModel = ReturnType<typeof useDentalChart>
