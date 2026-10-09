export const inputClass =
	'h-10 w-full rounded-[10px] border border-line-strong bg-surface px-3 text-ink outline-none transition-[border-color,box-shadow] duration-150 focus:border-brand focus:shadow-[0_0_0_3px_var(--brand-soft)] aria-invalid:border-danger'

/**
 * Taller clay input used on auth screens
 */
export const inputLgClass =
	'h-12 w-full rounded-xl border border-line-strong bg-surface px-3.5 text-[15px] text-ink shadow-clay-sm outline-none transition-[border-color,box-shadow] duration-150 focus:border-brand focus:shadow-[0_0_0_3px_var(--brand-soft)] aria-invalid:border-danger'

export const textareaClass =
	'min-h-21 w-full resize-y rounded-[10px] border border-line-strong bg-surface px-3 py-2.5 text-ink outline-none transition-[border-color,box-shadow] duration-150 focus:border-brand focus:shadow-[0_0_0_3px_var(--brand-soft)]'

/**
 * Responsive form grids: 2 or 3 columns, one column on phones
 */
export const formGrid2 =
	'grid grid-cols-2 gap-x-4 gap-y-3.5 max-[720px]:grid-cols-1'
export const formGrid3 =
	'grid grid-cols-3 gap-x-4 gap-y-3.5 max-[1100px]:grid-cols-2 max-[720px]:grid-cols-1'
