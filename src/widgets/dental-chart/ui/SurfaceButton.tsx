import { cn } from '@/shared/lib/cn'

import type { TSurfaceFinding } from '../model/Teeth'

type TSurfaceButtonProps = {
	abbreviation: string
	label: string
	finding?: TSurfaceFinding
	onClick: () => void
}

export function SurfaceButton(props: TSurfaceButtonProps) {
	const { abbreviation, label, finding, onClick } = props

	return (
		<button
			type='button'
			aria-label={label}
			title={label}
			onClick={onClick}
			className={cn(
				'inline-flex size-9 items-center justify-center rounded-[10px] border-0 font-mono text-xs font-semibold transition-transform duration-150 active:scale-95',
				finding === 'car' && 'bg-caries text-white',
				finding === 'fill' && 'bg-info text-surface',
				!finding &&
					'bg-surface text-ink-muted shadow-[inset_0_0_0_1px_var(--line-strong)]',
			)}
		>
			{abbreviation}
		</button>
	)
}
