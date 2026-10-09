import type { PaymentMethodId } from '@/entities/invoice'

import type { Tone } from '@/shared/ui/badge'

/**
 * Mock chart of one patient until the backend exposes /patients/:id
 */
export const PROFILE = {
	id: 'DN-20418',
	initials: 'at',
	fullName: 'Айгуль Тойчубекова',
	details: 'f34YO',
	phone: '+996 555 418 201',
	doctor: 'attendingDentistKasymovaA',
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
		procedure: 'rootCanalTreatment',
		tooth: '46',
		date: 'today1200',
		status: { label: 'next', tone: 'accent' },
		price: 9000,
	},
	{
		procedure: 'zirconiaCrown',
		tooth: '46',
		date: '29.10.2026',
		status: { label: 'booked', tone: 'info' },
		price: 18000,
	},
	{
		procedure: 'fillingDO',
		tooth: '26',
		date: 'notAssigned',
		dateMuted: true,
		status: { label: 'book', tone: 'warning' },
		price: 3500,
	},
	{
		procedure: 'surgicalExtraction',
		tooth: '38',
		date: 'notAssigned',
		dateMuted: true,
		status: { label: 'book', tone: 'warning' },
		price: 6000,
	},
	{
		procedure: 'fillingReplacementO',
		tooth: '14',
		date: 'notAssigned',
		dateMuted: true,
		status: { label: 'book', tone: 'warning' },
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
		title: 'examAndXRay',
		tooth: '46',
		meta: 'n12092026Kasymova',
		note: 'deepCariesWithPulp',
		done: true,
	},
	{
		title: 'filling',
		tooth: '36',
		meta: 'n04042026Petrov',
		done: true,
	},
	{
		title: 'implantPlacement',
		tooth: '37',
		meta: 'n15012025Toktogulov',
		done: true,
	},
	{
		title: 'crown',
		tooth: '21',
		meta: 'n18112024Kasymova',
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
		methodLabel: 'optimaBankTransfer',
		amount: 45000,
	},
]
