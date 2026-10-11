type TClassValue = string | false | null | undefined

/**
 * Joins truthy class names into one string
 */
export function cn(...classes: TClassValue[]): string {
	return classes.filter(Boolean).join(' ')
}
