import { cn } from '@/shared/lib/cn'

import { TOOLS, type TToolId } from '../model/Teeth'

type TSwatchProps = { className: string }

export function Swatch({ className }: TSwatchProps) {
	return <span className={cn('size-3.5 shrink-0 rounded', className)} />
}

export const getToolSwatchClass = (tool: TToolId) =>
	TOOLS.find(item => item.id === tool)?.swatch ?? ''
