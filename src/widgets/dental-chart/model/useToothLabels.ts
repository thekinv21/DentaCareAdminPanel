'use client'

import { useTranslations } from 'next-intl'

import {
	findingLabel,
	toothFlags,
	toothNameParts,
	toothTags,
} from './ChartLogic'
import {
	SURFACE_NAME,
	SURFACE_SHORT,
	type TSurface,
	type TToothState,
} from './Teeth'

/**
 * Translated names, accessible labels and badges for teeth and surfaces
 */
export function useToothLabels() {
	const t = useTranslations('DentalChart')

	const surfaceAbbreviation = (surface: TSurface) => t(SURFACE_SHORT[surface])

	const toothName = (toothNumber: number) => {
		const { kind, isPrimary, quadrant } = toothNameParts(toothNumber)
		return `${t(kind)}${isPrimary ? ` (${t('primaryTooth')})` : ''}, ${t(quadrant)}`
	}

	const withSurface = (label: string, surface?: TSurface, separator = ' ') =>
		surface
			? `${t(label)}${separator}${surfaceAbbreviation(surface)}`
			: t(label)

	return {
		surfaceAbbreviation,
		toothName,
		toothLabel: (toothNumber: number, toothState: TToothState) => {
			const flags = toothFlags(toothState).map(flag =>
				withSurface(flag.label, flag.surface),
			)
			const summary = flags.length ? flags.join(', ') : t('healthyTooth')
			return `${t('tooth')} ${toothNumber}, ${toothName(toothNumber)}, ${summary}`
		},
		surfaceTitle: (
			toothState: TToothState,
			surface: TSurface,
			nameKey = SURFACE_NAME[surface],
		) => {
			const finding = toothState.surfaces[surface]
			return finding
				? `${t(nameKey)} · ${t(findingLabel(finding))}`
				: t(nameKey)
		},
		tagsOf: (toothState: TToothState) =>
			toothTags(toothState).map(tag => ({
				tone: tag.tone,
				label: withSurface(tag.label, tag.surface, ' · '),
			})),
	}
}
