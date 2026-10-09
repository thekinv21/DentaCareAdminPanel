import type { Tone } from '@/shared/ui/badge'

import {
	type Surface,
	type SurfaceFinding,
	SURFACES,
	type ToothState,
} from './Teeth'

/* Pure chart rules; every label here is a Russian source string for `t` */

const KIND_PERMANENT = [
	'',
	'centralIncisor',
	'lateralIncisor',
	'canine',
	'firstPremolar',
	'secondPremolar',
	'firstMolar',
	'secondMolar',
	'thirdMolar',
]
const KIND_PRIMARY = [
	'',
	'centralIncisor',
	'lateralIncisor',
	'canine',
	'firstMolar',
	'secondMolar',
]
const QUADRANT: Record<number, string> = {
	1: 'upperRightQuadrant',
	2: 'upperLeftQuadrant',
	3: 'lowerLeftQuadrant',
	4: 'lowerRightQuadrant',
	5: 'upperRightQuadrant',
	6: 'upperLeftQuadrant',
	7: 'lowerLeftQuadrant',
	8: 'lowerRightQuadrant',
}

/**
 * FDI number → parts of "Первый моляр, нижний правый"
 */
export function toothNameParts(n: number) {
	const quadrant = Math.floor(n / 10)
	const position = n % 10
	const primary = quadrant >= 5
	return {
		kind: primary ? KIND_PRIMARY[position] : KIND_PERMANENT[position],
		primary,
		quadrant: QUADRANT[quadrant],
	}
}

export function findingLabel(finding: SurfaceFinding) {
	return finding === 'car' ? 'cariesFinding' : 'fillingFinding'
}

interface Flag {
	label: string
	surface?: Surface
}

function wholeToothFlags(tooth: ToothState): Flag[] {
	const flags: Flag[] = []
	if (tooth.crown) flags.push({ label: 'crownFinding' })
	if (tooth.endo) flags.push({ label: 'rootCanalsTreatedFinding' })
	if (tooth.implant) flags.push({ label: 'implantFinding' })
	if (tooth.extract) flags.push({ label: 'forExtractionFinding' })
	if (tooth.missing) flags.push({ label: 'missingFinding' })
	return flags
}

/**
 * Findings of a tooth for its accessible label
 */
export function toothFlags(tooth: ToothState): Flag[] {
	const surfaces = SURFACES.flatMap(surface => {
		const finding = tooth.surfaces[surface]
		return finding ? [{ label: findingLabel(finding), surface }] : []
	})
	return [...surfaces, ...wholeToothFlags(tooth)]
}

/**
 * Badges for the selected-tooth panel
 */
type Tag = Flag & { tone: Tone }

export function toothTags(tooth: ToothState): Tag[] {
	const tags = SURFACES.flatMap((surface): Tag[] => {
		const finding = tooth.surfaces[surface]
		if (finding === 'car')
			return [{ label: 'caries', surface, tone: 'warning' }]
		if (finding === 'fill')
			return [{ label: 'fillingTag', surface, tone: 'info' }]
		return []
	})
	if (tooth.crown) tags.push({ label: 'crownTag', tone: 'info' })
	if (tooth.endo) tags.push({ label: 'rootCanalsTreatedTag', tone: 'danger' })
	if (tooth.implant) tags.push({ label: 'implantTag', tone: 'neutral' })
	if (tooth.extract) tags.push({ label: 'extractionScheduled', tone: 'accent' })
	if (tooth.missing) tags.push({ label: 'missingTag', tone: 'neutral' })
	if (tooth.plan) tags.push({ label: 'inTreatmentPlan', tone: 'accent' })
	if (!tags.length) tags.push({ label: 'healthy', tone: 'ok' })
	return tags
}
