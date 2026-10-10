import { z } from 'zod'

import {
	displayDateSchema,
	requiredNumberSchema,
} from '@/shared/lib/validation'

import { STOCK_CATEGORIES } from './Stock'

export const STOCK_UNITS = ['pcs', 'cart', 'syr', 'pk', 'ml'] as const
export const SUPPLIERS = [
	'medsnabBishkek',
	'dentAsia',
	'implantServis',
] as const

export const stockItemSchema = z.object({
	name: z.string().trim().min(2, 'enterItemName'),
	sku: z.string().trim(),
	unit: z.enum(STOCK_UNITS),
	category: z.enum(STOCK_CATEGORIES),
	quantity: requiredNumberSchema,
	minimum: requiredNumberSchema,
	cost: z.string().trim().regex(/^\d*$/, 'enterWholeNumber'),
	supplier: z.enum(SUPPLIERS),
	// month and year of the batch, or empty / "—" for items without expiry
	expires: z
		.string()
		.trim()
		.regex(/^((0[1-9]|1[0-2])\.\d{4}|—)?$/, 'enterMonthYear'),
	place: z.string().trim(),
	autoWriteOff: z.boolean(),
})

export type TStockItemInput = z.input<typeof stockItemSchema>
export type TStockItemValues = z.output<typeof stockItemSchema>

export const MOVEMENT_TYPES = ['in', 'out', 'adj'] as const
export type TMovementType = (typeof MOVEMENT_TYPES)[number]

export const movementSchema = z.object({
	type: z.enum(MOVEMENT_TYPES),
	quantity: z.coerce.number<string>().int().min(1, 'enterAmount'),
	date: displayDateSchema,
	reason: z.string().trim(),
})

export type TMovementInput = z.input<typeof movementSchema>
export type TMovementValues = z.output<typeof movementSchema>
