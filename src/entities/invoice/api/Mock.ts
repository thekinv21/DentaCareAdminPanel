import type { TInvoice, TPaymentMethodId } from '../model/Types'

/**
 * Mock invoices until the backend exposes /invoices
 */
export const INVOICES: TInvoice[] = [
	{
		number: 'INV-26-0418',
		patientId: 'DN-20418',
		patientName: 'Айгуль Тойчубекова',
		service: 'rootCanalTreatment',
		tooth: '46',
		dueDate: '23.10',
		amount: 9000,
		balance: 6400,
		method: 'mbank',
		status: 'partial',
	},
	{
		number: 'INV-26-0417',
		patientId: 'DN-20311',
		patientName: 'Нурлан Асанов',
		service: 'professionalCleaning',
		dueDate: '09.10',
		amount: 2500,
		balance: 0,
		method: 'visa',
		status: 'paid',
	},
	{
		number: 'INV-26-0416',
		patientId: 'DN-20356',
		patientName: 'Елена Ковалёва',
		service: 'filling',
		tooth: '36',
		dueDate: '23.10',
		amount: 3500,
		balance: 1850,
		method: 'komp',
		status: 'partial',
	},
	{
		number: 'INV-26-0409',
		patientId: 'DN-20120',
		patientName: 'Динара Жумабаева',
		service: 'crown',
		tooth: '21',
		dueDate: '16.10',
		amount: 18000,
		balance: 12300,
		method: 'optima',
		status: 'due',
	},
	{
		number: 'INV-26-0388',
		patientId: 'DN-19982',
		patientName: 'Азамат Садыков',
		service: 'implantStage1',
		dueDate: '19.09',
		amount: 45000,
		balance: 2750,
		method: 'optima',
		status: 'overdue',
	},
	{
		number: 'INV-26-0371',
		patientId: 'DN-20402',
		patientName: 'Бакыт Усенов',
		service: 'extraction',
		tooth: '48',
		dueDate: '11.09',
		amount: 6000,
		balance: 6000,
		method: 'mbank',
		status: 'overdue',
	},
	{
		number: 'INV-26-0365',
		patientId: 'DN-20077',
		patientName: 'Жылдыз Осмонова',
		service: 'exam',
		dueDate: '30.09',
		amount: 800,
		balance: 0,
		method: 'visa',
		status: 'paid',
	},
	{
		number: 'INV-26-0352',
		patientId: 'DN-19870',
		patientName: 'Руслан Ким',
		service: 'periodontics',
		dueDate: '26.08',
		amount: 7200,
		balance: 7200,
		method: 'komp',
		status: 'overdue',
	},
	{
		number: 'INV-26-0412',
		patientId: 'DN-20433',
		patientName: 'Мария Ли',
		service: 'professionalCleaning',
		dueDate: '05.10',
		amount: 2500,
		balance: 0,
		method: 'mbank',
		status: 'paid',
	},
]

/**
 * October revenue split by payment method
 */
export const REVENUE_BY_METHOD: {
	method: TPaymentMethodId
	sum: number
	percent: number
}[] = [
	{ method: 'mbank', sum: 851900, percent: 39 },
	{ method: 'visa', sum: 655300, percent: 30 },
	{ method: 'optima', sum: 393200, percent: 18 },
	{ method: 'komp', sum: 283900, percent: 13 },
]
