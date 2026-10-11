import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'

const PREVIEW_TAG_TONE_CLASS = {
	danger: 'bg-danger-soft text-danger',
	info: 'bg-info-soft text-info',
}

type TPreviewTagProps = {
	tone: keyof typeof PREVIEW_TAG_TONE_CLASS
	children: ReactNode
}

export function PreviewTag({ tone, children }: TPreviewTagProps) {
	return (
		<span
			className={cn(
				'rounded-full px-2.5 py-0.5 text-xs font-semibold',
				PREVIEW_TAG_TONE_CLASS[tone],
			)}
		>
			{children}
		</span>
	)
}
