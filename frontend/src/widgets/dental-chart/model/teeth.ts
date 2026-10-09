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
