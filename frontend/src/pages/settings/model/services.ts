export type ServiceCategory = 'diag' | 'ther' | 'hyg' | 'surg' | 'orth'

export const SERVICE_CATEGORY: Record<ServiceCategory, string> = {
	diag: 'Диагностика',
	ther: 'Терапия',
	hyg: 'Гигиена',
	surg: 'Хирургия',
	orth: 'Ортопедия',
}

export const SERVICES: {
	code: string
	name: string
	category: ServiceCategory
	minutes: number
	price: number
	foms: boolean
}[] = [
	{
		code: 'T-01',
		name: 'Консультация и осмотр',
		category: 'diag',
		minutes: 20,
		price: 1500,
		foms: true,
	},
	{
		code: 'D-02',
		name: 'Прицельный снимок (RVG)',
		category: 'diag',
		minutes: 10,
		price: 600,
		foms: true,
	},
	{
		code: 'D-05',
		name: 'КТ одной челюсти',
		category: 'diag',
		minutes: 20,
		price: 3500,
		foms: false,
	},
	{
		code: 'T-11',
		name: 'Пломба светоотверждаемая',
		category: 'ther',
		minutes: 60,
		price: 6000,
		foms: false,
	},
	{
		code: 'T-14',
		name: 'Лечение каналов (1 канал)',
		category: 'ther',
		minutes: 60,
		price: 7500,
		foms: false,
	},
	{
		code: 'T-15',
		name: 'Лечение каналов (3 канала)',
		category: 'ther',
		minutes: 120,
		price: 18000,
		foms: false,
	},
	{
		code: 'H-01',
		name: 'Профгигиена Air Flow + ультразвук',
		category: 'hyg',
		minutes: 60,
		price: 4500,
		foms: false,
	},
	{
		code: 'S-03',
		name: 'Удаление зуба простое',
		category: 'surg',
		minutes: 30,
		price: 3000,
		foms: true,
	},
	{
		code: 'S-07',
		name: 'Удаление зуба мудрости',
		category: 'surg',
		minutes: 60,
		price: 9000,
		foms: false,
	},
	{
		code: 'S-12',
		name: 'Имплант Osstem (установка)',
		category: 'surg',
		minutes: 90,
		price: 55000,
		foms: false,
	},
	{
		code: 'O-04',
		name: 'Коронка металлокерамика',
		category: 'orth',
		minutes: 60,
		price: 16000,
		foms: false,
	},
	{
		code: 'O-06',
		name: 'Коронка диоксид циркония',
		category: 'orth',
		minutes: 60,
		price: 28000,
		foms: false,
	},
]
