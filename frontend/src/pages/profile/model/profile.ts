export const SECURITY_OPTIONS = [
	{
		id: 'tfa',
		label: 'Двухэтапная проверка',
		hint: 'Код по SMS на +996 555 ••• 441 при каждом входе',
	},
	{
		id: 'newdev',
		label: 'Оповещать о входе с нового устройства',
		hint: 'SMS и email сразу после входа',
	},
	{
		id: 'autolock',
		label: 'Блокировать экран через 10 минут',
		hint: 'Если компьютер в кабинете остаётся без внимания',
	},
]

export const SESSIONS = [
	{
		id: 'cur',
		device: 'Chrome · Windows 11',
		where: 'Кабинет 1 · Бишкек · 212.42.104.18',
		when: 'Сейчас',
	},
	{
		id: 'ipad',
		device: 'Safari · iPad',
		where: 'Бишкек · 212.42.104.22',
		when: 'Сегодня, 08:10',
	},
	{
		id: 'iph',
		device: 'Denta · iPhone 15',
		where: 'Бишкек · Beeline KG',
		when: 'Вчера, 21:42',
	},
	{
		id: 'home',
		device: 'Chrome · macOS',
		where: 'Бишкек · Aknet',
		when: '05.10.2026',
	},
]

export const NOTIFICATION_EVENTS = [
	{
		id: 'a',
		label: 'Новая онлайн-запись',
		hint: 'Пациент записался через сайт или Instagram',
	},
	{
		id: 'c',
		label: 'Отмена или перенос записи',
		hint: 'Включая ответы на SMS-напоминания',
	},
	{
		id: 'p',
		label: 'Оплата получена',
		hint: 'Visa, MBANK, Компаньон, Optima Bank',
	},
	{
		id: 's',
		label: 'Низкий остаток на складе',
		hint: 'Материалы, которые вы используете',
	},
	{
		id: 'r',
		label: 'Еженедельный отчёт',
		hint: 'Выручка и загрузка по понедельникам',
	},
	{
		id: 'm',
		label: 'Сообщения от коллег',
		hint: 'Комментарии к планам лечения',
	},
]

export const NOTIFICATION_CHANNELS = [
	{ id: 'app', label: 'В приложении', aria: 'в приложении' },
	{ id: 'sms', label: 'SMS', aria: 'SMS' },
	{ id: 'mail', label: 'Email', aria: 'email' },
]

export const INITIAL_PREFERENCES: Record<string, boolean> = {
	tfa: true,
	newdev: true,
	autolock: true,
	a_app: true,
	a_sms: false,
	a_mail: false,
	c_app: true,
	c_sms: true,
	c_mail: false,
	p_app: true,
	p_sms: false,
	p_mail: true,
	s_app: true,
	s_sms: false,
	s_mail: false,
	r_app: false,
	r_sms: false,
	r_mail: true,
	m_app: true,
	m_sms: false,
	m_mail: false,
}

export const INTERFACE_LANGUAGES = [
	{ id: 'ru', code: 'RU', name: 'Русский', note: 'По умолчанию' },
	{ id: 'ky', code: 'KY', name: 'Кыргызча', note: 'Государственный язык' },
	{ id: 'en', code: 'EN', name: 'English', note: 'Международный' },
]
