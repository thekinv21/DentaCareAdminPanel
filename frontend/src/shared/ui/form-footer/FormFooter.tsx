import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'

interface FormFooterProps {
	saved: boolean
	savedLabel: string
	dirty?: boolean
	onSave: () => void
	onReset: () => void
}

/**
 * Sticky save/cancel bar at the bottom of a settings card
 */
export function FormFooter({
	saved,
	savedLabel,
	dirty,
	onSave,
	onReset,
}: FormFooterProps) {
	return (
		<div className='flex shrink-0 items-center justify-end gap-2.5 border-t border-line pt-3.5'>
			{saved && (
				<span role='status' className='mr-auto animate-fade'>
					<Badge tone='ok'>{savedLabel}</Badge>
				</span>
			)}
			{dirty && !saved && (
				<span className='mr-auto text-[12.5px] text-ink-muted'>
					Есть несохранённые изменения
				</span>
			)}
			<Button onClick={onReset}>Отменить</Button>
			<Button variant='primary' onClick={onSave}>
				Сохранить
			</Button>
		</div>
	)
}
