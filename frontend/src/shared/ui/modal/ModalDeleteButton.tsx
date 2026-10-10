import { Trash2 } from 'lucide-react'

import { Button } from '@/shared/ui/button'

type TModalDeleteButtonProps = {
	onClick: () => void
	children: string
}

/**
 * Quiet red "Delete …" action for the left side of a modal footer
 */
export function ModalDeleteButton({
	onClick,
	children,
}: TModalDeleteButtonProps) {
	return (
		<Button variant='dangerGhost' onClick={onClick}>
			<Trash2 size={16} aria-hidden='true' />
			{children}
		</Button>
	)
}
