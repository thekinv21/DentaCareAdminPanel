import { cn } from '@/shared/lib/cn'

import { TOOLS, type TToolId } from '../model/Teeth'

export function Swatch({ className }: { className: string }) {
	return <span className={cn('size-3.5 shrink-0 rounded', className)} />
}

export const swatchOf = (tool: TToolId) =>
	TOOLS.find(item => item.id === tool)?.swatch ?? ''
