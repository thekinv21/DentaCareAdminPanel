import type { ReactNode } from 'react'

type TPreviewTagProps = {
	className: string
	children: ReactNode
}

export function PreviewTag({ className, children }: TPreviewTagProps) {
	return (
		<span
			className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}
		>
			{children}
		</span>
	)
}
