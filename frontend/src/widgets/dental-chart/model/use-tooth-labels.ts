'use client'

import { useI18n } from '@/shared/lib/i18n'

import {
	findingLabel,
	toothFlags,
	toothNameParts,
	toothTags,
} from './chart-logic'
import {
	type Surface,
	SURFACE_NAME,
	SURFACE_SHORT,
	type ToothState,
} from './teeth'

/**
 * Translated names, accessible labels and badges for teeth and surfaces
 */
export function useToothLabels(stateOf: (n: number) => ToothState) {
	const { t } = useI18n()

	const surfaceShort = (surface: Surface) => t(SURFACE_SHORT[surface])

	const toothName = (n: number) => {
		const { kind, primary, quadrant } = toothNameParts(n)
		return `${t(kind)}${primary ? ` (${t('молочный')})` : ''}, ${t(quadrant)}`
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
			const summary = flags.length ? flags.join(', ') : t('здоров')
			return `${t('Зуб')} ${n}, ${toothName(n)}, ${summary}`
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
