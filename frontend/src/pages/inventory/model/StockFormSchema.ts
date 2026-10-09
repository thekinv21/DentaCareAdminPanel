import { z } from 'zod'

export const STOCK_UNITS = ['pcs', 'cart', 'syr', 'pk', 'ml'] as const
export const STOCK_CATEGORIES = [
	'anes',
	'cons',
	'rest',
	'endo',
	'impl',
	'hyg',
] as const
export const SUPPLIERS = [
	'medsnabBishkek',
	'dentAsia',
	'implantServis',
] as const

const count = z.coerce.number<string>().int().min(0, 'enterAmount')

export const stockItemSchema = z.object({
	name: z.string().trim().min(2, 'enterItemName'),
	sku: z.string().trim(),
	unit: z.enum(STOCK_UNITS),
	category: z.enum(STOCK_CATEGORIES),
	quantity: count,
	minimum: count,
	cost: z.string().trim(),
	supplier: z.enum(SUPPLIERS),
	expires: z.string().trim(),
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
	date: z.string().trim(),
	reason: z.string().trim(),
})

export type TMovementInput = z.input<typeof movementSchema>
export type TMovementValues = z.output<typeof movementSchema>
