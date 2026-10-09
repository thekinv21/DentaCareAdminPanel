import { z } from 'zod'

/**
 * Local part of a Kyrgyz mobile number after +996: 9 digits, spaces allowed
 */
export const kgPhoneSchema = z
	.string()
	.trim()
	.refine(value => /^\d{9}$/.test(value.replace(/\s/g, '')), 'enterThe9Digit')

export const PASSWORD_RULES = [
	{
		label: 'atLeast10Characters',
		test: (value: string) => value.length >= 10,
	},
	{
		label: 'uppercaseLetter',
		test: (value: string) => /[A-ZА-ЯЁ]/.test(value),
	},
	{ label: 'digit', test: (value: string) => /\d/.test(value) },
	{ label: 'symbol', test: (value: string) => /[^\wА-Яа-яЁё]/.test(value) },
]

export const strongPasswordSchema = z
	.string()
	.refine(
		value => PASSWORD_RULES.every(rule => rule.test(value)),
		'passwordDoesntMeetThe',
	)
