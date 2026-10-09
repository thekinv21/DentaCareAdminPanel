import type { Tone } from '@/shared/ui/badge'

import {
	type Surface,
	type SurfaceFinding,
	SURFACES,
	type ToothState,
} from './teeth'

/* Pure chart rules; every label here is a Russian source string for `t` */

const KIND_PERMANENT = [
	'',
	'Центральный резец',
	'Боковой резец',
	'Клык',
	'Первый премоляр',
	'Второй премоляр',
	'Первый моляр',
	'Второй моляр',
	'Третий моляр',
]
const KIND_PRIMARY = [
	'',
	'Центральный резец',
	'Боковой резец',
	'Клык',
	'Первый моляр',
	'Второй моляр',
]
const QUADRANT: Record<number, string> = {
	1: 'верхний правый',
	2: 'верхний левый',
	3: 'нижний левый',
	4: 'нижний правый',
	5: 'верхний правый',
	6: 'верхний левый',
	7: 'нижний левый',
	8: 'нижний правый',
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
	return finding === 'car' ? 'кариес' : 'пломба'
}

interface Flag {
	label: string
	surface?: Surface
}

function wholeToothFlags(tooth: ToothState): Flag[] {
	const flags: Flag[] = []
	if (tooth.crown) flags.push({ label: 'коронка' })
	if (tooth.endo) flags.push({ label: 'каналы пролечены' })
	if (tooth.implant) flags.push({ label: 'имплант' })
	if (tooth.extract) flags.push({ label: 'к удалению' })
	if (tooth.missing) flags.push({ label: 'отсутствует' })
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
			return [{ label: 'Кариес', surface, tone: 'warning' }]
		if (finding === 'fill') return [{ label: 'Пломба', surface, tone: 'info' }]
		return []
	})
	if (tooth.crown) tags.push({ label: 'Коронка', tone: 'info' })
	if (tooth.endo) tags.push({ label: 'Каналы пролечены', tone: 'danger' })
	if (tooth.implant) tags.push({ label: 'Имплант', tone: 'neutral' })
	if (tooth.extract)
		tags.push({ label: 'Запланировано удаление', tone: 'accent' })
	if (tooth.missing) tags.push({ label: 'Отсутствует', tone: 'neutral' })
	if (tooth.plan) tags.push({ label: 'В плане лечения', tone: 'accent' })
	if (!tags.length) tags.push({ label: 'Здоров', tone: 'ok' })
	return tags
}
