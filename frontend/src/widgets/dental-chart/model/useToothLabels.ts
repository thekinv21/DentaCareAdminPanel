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
export function useToothLabels(stateOf: (n: number) => TToothState) {
	const t = useTranslations('DentalChart')

	const surfaceShort = (surface: TSurface) => t(SURFACE_SHORT[surface])

	const toothName = (n: number) => {
		const { kind, primary, quadrant } = toothNameParts(n)
		return `${t(kind)}${primary ? ` (${t('primaryTooth')})` : ''}, ${t(quadrant)}`
	}

	const withSurface = (label: string, surface?: TSurface, separator = ' ') =>
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
			surface: TSurface,
			name = SURFACE_NAME[surface],
		) => {
			const finding = stateOf(n).surfaces[surface]
			return finding ? `${t(name)} · ${t(findingLabel(finding))}` : t(name)
		},
		tagsOf: (tooth: TToothState) =>
			toothTags(tooth).map(tag => ({
				tone: tag.tone,
				label: withSurface(tag.label, tag.surface, ' · '),
			})),
	}
}
