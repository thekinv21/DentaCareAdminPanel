import { cn } from '@/shared/lib/cn'

import { type ToolId, TOOLS } from '../model/teeth'

export function Swatch({ className }: { className: string }) {
	return <span className={cn('size-3.5 shrink-0 rounded', className)} />
}

export const swatchOf = (tool: ToolId) =>
	TOOLS.find(item => item.id === tool)?.swatch ?? ''
