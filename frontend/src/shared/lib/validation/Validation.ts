import { z } from 'zod'

import { displayDateToIso } from '../date'

/**
 * Local part of a Kyrgyz mobile number after +996: 9 digits, spaces allowed
 */
export const kgPhoneSchema = z
	.string()
	.trim()
	.refine(
		value => /^\d{9}$/.test(value.replace(/\s/g, '')),
		'phoneMustHave9Digits',
	)

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
		'passwordTooWeak',
	)

/**
 * A real calendar day typed as DD.MM.YYYY
 */
export const displayDateSchema = z
	.string()
	.trim()
	.refine(value => displayDateToIso(value) !== null, 'enterDateDdMmYyyy')

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/

/**
 * Clock time "HH:MM", 00:00–23:59
 */
export const timeSchema = z.string().trim().regex(TIME_PATTERN, 'enterTimeHhMm')

/**
 * Whole percentage 0–100 typed into a text input
 */
export const percentSchema = z
	.string()
	.trim()
	.regex(/^\d{1,3}$/, 'enterPercent')
	.refine(value => Number(value) <= 100, 'enterPercent')

/**
 * Required number typed into a text input: an empty field is an error, not 0
 */
export const requiredNumberSchema = z
	.string()
	.trim()
	.min(1, 'enterRequiredValue')
	.pipe(z.coerce.number<string>().int('enterWholeNumber').min(0, 'enterAmount'))
