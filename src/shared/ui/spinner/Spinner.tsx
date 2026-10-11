/**
 * Small inline loading ring that inherits the text color
 */
export function Spinner() {
	return (
		<span
			aria-hidden='true'
			className='size-4 shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent'
		/>
	)
}
