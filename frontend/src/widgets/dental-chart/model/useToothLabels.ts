'use client'

import { useTranslations } from 'next-intl'

import {
	findingLabel,
	toothFlags,
	toothNameParts,
	toothTags,
} from './ChartLogic'
import {
	type Surface,
	SURFACE_NAME,
	SURFACE_SHORT,
	type ToothState,
} from './Teeth'

/**
 * Translated names, accessible labels and badges for teeth and surfaces
 */
export function useToothLabels(stateOf: (n: number) => ToothState) {
	const t = useTranslations('DentalChart')

	const surfaceShort = (surface: Surface) => t(SURFACE_SHORT[surface])

	const toothName = (n: number) => {
		const { kind, primary, quadrant } = toothNameParts(n)
		return `${t(kind)}${primary ? ` (${t('primaryTooth')})` : ''}, ${t(quadrant)}`
	}

	const withSurface = (label: string, surface?: Surface, separator = ' ') =>
		surface ? `${t(label)}${separator}${surfaceShort(surface)}` : t(label)

	return {
		surfaceShort,
		toothName,
		toothLabel: (n: number) => {
			const flags = toothFlags(stateOf(n)).map(flag =>
				withSurface(flag.label, flag.surface),
			)
			const summary = flags.length ? flags.join(', ') : t('healthyTooth')
			return `${t('tooth')} ${n}, ${toothName(n)}, ${summary}`
		},
		surfaceTitle: (
			n: number,
			surface: Surface,
			name = SURFACE_NAME[surface],
		) => {
			const finding = stateOf(n).surfaces[surface]
			return finding ? `${t(name)} · ${t(findingLabel(finding))}` : t(name)
		},
		tagsOf: (tooth: ToothState) =>
			toothTags(tooth).map(tag => ({
				tone: tag.tone,
				label: withSurface(tag.label, tag.surface, ' · '),
			})),
	}
}
