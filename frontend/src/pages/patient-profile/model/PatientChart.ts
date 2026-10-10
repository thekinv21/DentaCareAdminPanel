import type { TDoctorId } from '@/entities/employee'
import type { TPaymentMethodId } from '@/entities/invoice'

import type { TTone } from '@/shared/ui/badge'

/**
 * Mock card details the patient list doesn't carry, until GET /patients/:id
 */
export const PATIENT_CARD = {
	gender: 'f' as const,
	birthDate: '03.02.1992',
	doctorId: 'kas' as const,
	allergies: ['allergyPenicillin', 'latex'],
}

/**
 * When and with whom the treatment plan was agreed
 */
export const PLAN_AGREEMENT = { date: '12.09.2026', doctorId: 'kas' as const }

export const PLAN_STEPS: {
	procedure: string
	tooth: string
	/**
	 * "dd.mm.yyyy", a time today ("HH:MM") or null when not booked yet
	 */
	date: { kind: 'date'; value: string } | { kind: 'today'; time: string } | null
	status: { label: string; tone: TTone }
	price: number
}[] = [
	{
		procedure: 'rootCanalTreatment',
		tooth: '46',
		date: { kind: 'today', time: '12:00' },
		status: { label: 'next', tone: 'accent' },
		price: 9000,
	},
	{
		procedure: 'zirconiaCrown',
		tooth: '46',
		date: { kind: 'date', value: '29.10.2026' },
		status: { label: 'booked', tone: 'info' },
		price: 18000,
	},
	{
		procedure: 'fillingDO',
		tooth: '26',
		date: null,
		status: { label: 'book', tone: 'warning' },
		price: 3500,
	},
	{
		procedure: 'surgicalExtraction',
		tooth: '38',
		date: null,
		status: { label: 'book', tone: 'warning' },
		price: 6000,
	},
	{
		procedure: 'fillingReplacementO',
		tooth: '14',
		date: null,
		status: { label: 'book', tone: 'warning' },
		price: 3500,
	},
]

export const VISITS: {
	title: string
	tooth: string
	date: string
	doctorId: TDoctorId
	note?: string
	isDone: boolean
}[] = [
	{
		title: 'examAndXRay',
		tooth: '46',
		date: '12.09.2026',
		doctorId: 'kas',
		note: 'deepCariesWithPulp',
		isDone: true,
	},
	{
		title: 'filling',
		tooth: '36',
		date: '04.04.2026',
		doctorId: 'pet',
		isDone: true,
	},
	{
		title: 'implantPlacement',
		tooth: '37',
		date: '15.01.2025',
		doctorId: 'tok',
		isDone: true,
	},
	{
		title: 'crown',
		tooth: '21',
		date: '18.11.2024',
		doctorId: 'kas',
		isDone: false,
	},
]

export const PAYMENTS: {
	date: string
	invoice: string
	method: TPaymentMethodId
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
