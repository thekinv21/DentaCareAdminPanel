import type { PlanStatus } from './PlanStatus'

export interface TreatmentPlan {
	patientId: string
	patientName: string
	title: string
	teeth: string
	stepsDone: number
	stepsTotal: number
	value: number
	status: PlanStatus
	doctor: string
	updated: string
}

/**
 * Mock data until the backend exposes /treatment-plans
 */
export const TREATMENT_PLANS: TreatmentPlan[] = [
	{
		patientId: 'DN-20418',
		patientName: 'Айгуль Тойчубекова',
		title: 'endodonticsAndCrown',
		teeth: '46 · 26 · 38 · 14',
		stepsDone: 0,
		stepsTotal: 5,
		value: 40000,
		status: 'approved',
		doctor: 'Касымова А.',
		updated: '12.09',
	},
	{
		patientId: 'DN-20120',
		patientName: 'Динара Жумабаева',
		title: 'anteriorCrowns',
		teeth: '11 · 21',
		stepsDone: 2,
		stepsTotal: 3,
		value: 36000,
		status: 'progress',
		doctor: 'Петров С.',
		updated: 'today',
	},
	{
		patientId: 'DN-20402',
		patientName: 'Бакыт Усенов',
		title: 'implantAndBridge',
		teeth: '36 · 37',
		stepsDone: 0,
		stepsTotal: 4,
		value: 98000,
		status: 'waiting',
		doctor: 'Токтогулов Э.',
		updated: 'today',
	},
	{
		patientId: 'DN-19982',
		patientName: 'Азамат Садыков',
		title: 'implantPlacement',
		teeth: '46',
		stepsDone: 1,
		stepsTotal: 3,
		value: 52000,
		status: 'progress',
		doctor: 'Токтогулов Э.',
		updated: '03.10',
	},
	{
		patientId: 'DN-20356',
		patientName: 'Елена Ковалёва',
		title: 'fillings',
		teeth: '36 · 24',
		stepsDone: 2,
		stepsTotal: 2,
		value: 7000,
		status: 'done',
		doctor: 'Петров С.',
		updated: 'today',
	},
	{
		patientId: 'DN-20455',
		patientName: 'Гульнара Мамытова',
		title: 'ceramicVeneers',
		teeth: '13 – 23',
		stepsDone: 0,
		stepsTotal: 6,
		value: 132000,
		status: 'waiting',
		doctor: 'Петров С.',
		updated: '06.10',
	},
	{
		patientId: 'DN-20391',
		patientName: 'Тимур Абдыкадыров',
		title: 'wisdomTeethExtraction',
		teeth: '38 · 48',
		stepsDone: 0,
		stepsTotal: 2,
		value: 12000,
		status: 'draft',
		doctor: 'Токтогулов Э.',
		updated: '07.10',
	},
	{
		patientId: 'DN-19870',
		patientName: 'Руслан Ким',
		title: 'periodontalTreatment',
		teeth: 'entireMouth',
		stepsDone: 3,
		stepsTotal: 4,
		value: 21600,
		status: 'progress',
		doctor: 'Касымова А.',
		updated: '01.10',
	},
	{
		patientId: 'DN-20210',
		patientName: 'Нурлан Алиев',
		title: 'aligners',
		teeth: 'bothJaws',
		stepsDone: 0,
		stepsTotal: 12,
		value: 165000,
		status: 'declined',
		doctor: 'Касымова А.',
		updated: '28.09',
	},
]
