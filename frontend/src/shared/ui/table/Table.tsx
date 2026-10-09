import type {
	ReactNode,
	TableHTMLAttributes,
	TdHTMLAttributes,
	ThHTMLAttributes,
} from 'react'

import { cn } from '@/shared/lib/cn'

interface TableScrollProps {
	className?: string
	children: ReactNode
}

/**
 * Horizontal scroll box that bleeds to the card edges
 */
export function TableScroll({ className, children }: TableScrollProps) {
	return (
		<div
			className={cn('-mx-4.5 overflow-auto px-4.5 scrollbar-thin', className)}
		>
			{children}
		</div>
	)
}

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
	hoverRows?: boolean
}

export function Table({ hoverRows = true, className, ...props }: TableProps) {
	return (
		<table
			className={cn(
				'w-full border-separate border-spacing-0 text-[13px] leading-4.5',
				hoverRows && '[&_tbody_tr:hover_td]:bg-raised',
				className,
			)}
			{...props}
		/>
	)
}

interface ThProps extends ThHTMLAttributes<HTMLTableCellElement> {
	align?: 'left' | 'center' | 'right'
}

export function Th({
	align = 'left',
	className,
	scope = 'col',
	...props
}: ThProps) {
	return (
		<th
			scope={scope}
			className={cn(
				'sticky top-0 z-1 border-b border-line bg-surface p-2.5 text-[11px] leading-3.5 font-semibold tracking-[0.06em] whitespace-nowrap text-ink-muted uppercase',
				align === 'left' && 'text-left',
				align === 'center' && 'text-center',
				align === 'right' && 'text-right',
				className,
			)}
			{...props}
		/>
	)
}

interface TdProps extends TdHTMLAttributes<HTMLTableCellElement> {
	align?: 'left' | 'center' | 'right'
	mono?: boolean
	nowrap?: boolean
}

export function Td({ align, mono, nowrap, className, ...props }: TdProps) {
	return (
		<td
			className={cn(
				'border-b border-line p-2.5 align-middle transition-colors duration-150',
				align === 'center' && 'text-center',
				align === 'right' && 'text-right',
				mono && 'font-mono tabular-nums',
				nowrap && 'whitespace-nowrap',
				className,
			)}
			{...props}
		/>
	)
}
