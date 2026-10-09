import { z } from 'zod'

/**
 * Local part of a Kyrgyz mobile number after +996: 9 digits, spaces allowed
 */
export const kgPhoneSchema = z
	.string()
	.trim()
	.refine(
		value => /^\d{9}$/.test(value.replace(/\s/g, '')),
		'Введите 9 цифр номера',
	)

export const PASSWORD_RULES = [
	{
		label: 'Не короче 10 символов',
		test: (value: string) => value.length >= 10,
	},
	{
		label: 'Заглавная буква',
		test: (value: string) => /[A-ZА-ЯЁ]/.test(value),
	},
	{ label: 'Цифра', test: (value: string) => /\d/.test(value) },
	{ label: 'Спецсимвол', test: (value: string) => /[^\wА-Яа-яЁё]/.test(value) },
]

export const strongPasswordSchema = z
	.string()
	.refine(
		value => PASSWORD_RULES.every(rule => rule.test(value)),
		'Пароль не отвечает требованиям',
	)
