import type { PaymentMethodId } from '@/entities/invoice'

import type { Tone } from '@/shared/ui/badge'

/**
 * Mock chart of one patient until the backend exposes /patients/:id
 */
export const PROFILE = {
	id: 'DN-20418',
	initials: 'АТ',
	fullName: 'Айгуль Тойчубекова',
	details: 'Ж · 34 года · 03.02.1992',
	phone: '+996 555 418 201',
	doctor: 'Лечащий врач: Касымова А.',
}

export const PLAN_STEPS: {
	procedure: string
	tooth: string
	date: string
	dateMuted?: boolean
	status: { label: string; tone: Tone }
	price: number
}[] = [
	{
		procedure: 'Лечение каналов',
		tooth: '46',
		date: 'Сегодня · 12:00',
		status: { label: 'Следующий', tone: 'accent' },
		price: 9000,
	},
	{
		procedure: 'Коронка из диоксида циркония',
		tooth: '46',
		date: '29.10.2026',
		status: { label: 'Записан', tone: 'info' },
		price: 18000,
	},
	{
		procedure: 'Пломба · Д, Ж',
		tooth: '26',
		date: 'Не назначено',
		dateMuted: true,
		status: { label: 'Записать', tone: 'warning' },
		price: 3500,
	},
	{
		procedure: 'Хирургическое удаление',
		tooth: '38',
		date: 'Не назначено',
		dateMuted: true,
		status: { label: 'Записать', tone: 'warning' },
		price: 6000,
	},
	{
		procedure: 'Замена пломбы · Ж',
		tooth: '14',
		date: 'Не назначено',
		dateMuted: true,
		status: { label: 'Записать', tone: 'warning' },
		price: 3500,
	},
]

export const VISITS: {
	title: string
	tooth: string
	meta: string
	note?: string
	done: boolean
}[] = [
	{
		title: 'Осмотр и снимок ·',
		tooth: '46',
		meta: '12.09.2026 · Касымова А.',
		note: 'Глубокий кариес с вовлечением пульпы. Показано эндодонтическое лечение.',
		done: true,
	},
	{
		title: 'Пломба ·',
		tooth: '36',
		meta: '04.04.2026 · Петров С.',
		done: true,
	},
	{
		title: 'Имплантация ·',
		tooth: '37',
		meta: '15.01.2025 · Токтогулов Э.',
		done: true,
	},
	{
		title: 'Коронка ·',
		tooth: '21',
		meta: '18.11.2024 · Касымова А.',
		done: false,
	},
]

export const PAYMENTS: {
	date: string
	invoice: string
	method: PaymentMethodId
	methodLabel: string
	amount: number
}[] = [
	{
		date: '12.09.2026',
		invoice: 'INV-26-0388',
		method: 'mbank',
		methodLabel: 'MBANK · QR',
		amount: 2600,
	},
	{
		date: '04.04.2026',
		invoice: 'INV-26-0141',
		method: 'visa',
		methodLabel: 'Visa •• 4417',
		amount: 3500,
	},
	{
		date: '15.01.2025',
		invoice: 'INV-25-0032',
		method: 'optima',
		methodLabel: 'Optima Bank · перевод',
		amount: 45000,
	},
]
