import type { Tone } from '@/shared/ui/badge'

export type Surface = 'm' | 'd' | 'b' | 'o' | 'c'
export type SurfaceFinding = 'car' | 'fill'

export interface ToothState {
	surfaces: Partial<Record<Surface, SurfaceFinding>>
	crown?: boolean
	endo?: boolean
	implant?: boolean
	missing?: boolean
	extract?: boolean
	plan?: boolean
}

export type ChartMap = Record<number, ToothState>

export type Dentition = 'permanent' | 'primary'

export type ToolId =
	| 'select'
	| 'car'
	| 'fill'
	| 'crown'
	| 'endo'
	| 'implant'
	| 'extract'
	| 'missing'
	| 'clear'

export const SURFACES: Surface[] = ['m', 'd', 'b', 'o', 'c']

export const SURFACE_NAME: Record<Surface, string> = {
	m: 'Медиальная',
	d: 'Дистальная',
	b: 'Вестибулярная',
	o: 'Оральная',
	c: 'Жевательная',
}

export const SURFACE_SHORT: Record<Surface, string> = {
	m: 'М',
	d: 'Д',
	b: 'В',
	o: 'О',
	c: 'Ж',
}

export const TOOLS: {
	id: ToolId
	label: string
	swatch: string
	hint: string
}[] = [
	{
		id: 'select',
		label: 'Выбор',
		swatch: 'bg-surface border-[1.5px] border-ink-muted',
		hint: 'Выбрать зуб',
	},
	{
		id: 'car',
		label: 'Кариес',
		swatch: 'bg-caries',
		hint: 'Нажмите на поверхность',
	},
	{
		id: 'fill',
		label: 'Пломба',
		swatch: 'bg-info',
		hint: 'Нажмите на поверхность',
	},
	{
		id: 'crown',
		label: 'Коронка',
		swatch: 'bg-info-soft border-[3px] border-info',
		hint: 'Нажмите на зуб',
	},
	{
		id: 'endo',
		label: 'Каналы',
		swatch: 'bg-danger',
		hint: 'Пролеченные каналы',
	},
	{
		id: 'implant',
		label: 'Имплант',
		swatch: 'bg-sunken border-[1.5px] border-ink-muted',
		hint: 'Нажмите на зуб',
	},
	{
		id: 'extract',
		label: 'Удалить',
		swatch: 'bg-accent-soft border-[1.5px] border-accent',
		hint: 'Запланировать удаление',
	},
	{
		id: 'missing',
		label: 'Отсутствует',
		swatch: 'bg-transparent border-[1.5px] border-dashed border-line-strong',
		hint: 'Нажмите на зуб',
	},
	{
		id: 'clear',
		label: 'Ластик',
		swatch: 'bg-raised border border-line',
		hint: 'Сбросить зуб',
	},
]

export const PERMANENT_UPPER = [
	18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
]
export const PERMANENT_LOWER = [
	48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
]
export const PRIMARY_UPPER = [55, 54, 53, 52, 51, 61, 62, 63, 64, 65]
export const PRIMARY_LOWER = [85, 84, 83, 82, 81, 71, 72, 73, 74, 75]

/**
 * Mock chart of patient DN-20418 (last updated 12.09.2026)
 */
export const INITIAL_CHART: ChartMap = {
	46: { surfaces: { d: 'car', c: 'car' }, plan: true },
	47: { surfaces: { c: 'car' } },
	36: { surfaces: { d: 'fill' } },
	16: { surfaces: {}, crown: true, endo: true },
	21: { surfaces: {}, crown: true, endo: true },
	26: { surfaces: { d: 'car', c: 'car' }, plan: true },
	25: { surfaces: { m: 'fill' } },
	14: { surfaces: { c: 'fill' }, plan: true },
	38: { surfaces: {}, extract: true, plan: true },
	37: { surfaces: {}, implant: true, crown: true },
	18: { surfaces: {}, missing: true },
	48: { surfaces: {}, missing: true },
}

export const TOOTH_NOTES: Record<number, string> = {
	46: 'Глубокий дистальный кариес с вовлечением пульпы. Сегодня — лечение каналов, 29.10 — коронка.',
	26: 'Кариес на дистальной и жевательной поверхностях. Запланирована пломба.',
	38: 'Частично прорезавшийся, рецидивирующий перикоронит. Хирургическое удаление.',
	37: 'Имплант с коронкой, установлен 15.01.2025. Без жалоб.',
	16: 'Металлокерамическая коронка, каналы пролечены (2019).',
	21: 'Керамическая коронка после травмы.',
	14: 'Стёртая пломба, план — замена.',
}

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
 * FDI number → "Первый моляр, нижний правый"
 */
export function toothName(n: number): string {
	const quadrant = Math.floor(n / 10)
	const position = n % 10
	const kind =
		quadrant >= 5
			? `${KIND_PRIMARY[position]} (молочный)`
			: KIND_PERMANENT[position]
	return `${kind}, ${QUADRANT[quadrant]}`
}

export function findingLabel(finding: SurfaceFinding) {
	return finding === 'car' ? 'кариес' : 'пломба'
}

/**
 * Badges for the selected-tooth panel
 */
export function toothTags(tooth: ToothState): { label: string; tone: Tone }[] {
	const tags: { label: string; tone: Tone }[] = []
	SURFACES.forEach(surface => {
		const finding = tooth.surfaces[surface]
		if (finding === 'car')
			tags.push({
				label: `Кариес · ${SURFACE_SHORT[surface]}`,
				tone: 'warning',
			})
		if (finding === 'fill')
			tags.push({ label: `Пломба · ${SURFACE_SHORT[surface]}`, tone: 'info' })
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

/**
 * Accessible summary of a tooth for its button label
 */
export function toothFlags(tooth: ToothState): string[] {
	const flags: string[] = []
	SURFACES.forEach(surface => {
		const finding = tooth.surfaces[surface]
		if (finding)
			flags.push(`${findingLabel(finding)} ${SURFACE_SHORT[surface]}`)
	})
	if (tooth.crown) flags.push('коронка')
	if (tooth.endo) flags.push('каналы пролечены')
	if (tooth.implant) flags.push('имплант')
	if (tooth.extract) flags.push('к удалению')
	if (tooth.missing) flags.push('отсутствует')
	return flags
}

/**
 * Applies a whole-tooth tool; surface tools (caries, filling) mark the occlusal surface
 */
export function applyTool(tooth: ToothState, tool: ToolId): ToothState {
	const next: ToothState = { ...tooth, surfaces: { ...tooth.surfaces } }
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

export function summarize(chart: ChartMap) {
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
