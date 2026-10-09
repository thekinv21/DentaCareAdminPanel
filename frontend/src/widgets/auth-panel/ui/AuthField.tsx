import type { ReactNode } from 'react'

type TAuthFieldProps = {
	id: string
	label: string
	error?: string
	hint?: string
	aside?: ReactNode
	children: ReactNode
}

export function AuthField(_props: TAuthFieldProps) {
	const { id, label, error, hint, aside, children } = _props

	return (
		<div className='flex flex-col gap-1.5'>
			<div className='flex items-baseline justify-between'>
				<label htmlFor={id} className='text-[13px] leading-4.5 font-semibold'>
					{label}
				</label>
				{aside}
			</div>
			{children}
			{error ? (
				<span
					id={`${id}-error`}
					className='text-[12.5px] leading-4.5 text-danger'
				>
					{error}
				</span>
			) : (
				hint && (
					<span className='text-[12.5px] leading-4.5 text-ink-muted'>
						{hint}
					</span>
				)
			)}
		</div>
	)
}
