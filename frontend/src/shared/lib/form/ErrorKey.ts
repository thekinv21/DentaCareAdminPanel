import { type FieldErrors, get } from 'react-hook-form'

/**
 * Validation message key of a field; array fields also report their `root` error
 */
export function errorKeyOf(errors: FieldErrors, name: string) {
	const message: string | undefined =
		get(errors, name)?.message ?? get(errors, `${name}.root`)?.message

	return message
}
