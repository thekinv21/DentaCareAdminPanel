import { ToothIcon } from '@/shared/ui/logo'

export function BrandLogo() {
	return (
		<div className='relative flex items-center gap-3'>
			<span className='flex size-11 items-center justify-center rounded-[14px] bg-surface text-brand-strong shadow-[0_10px_24px_-10px_rgba(0,0,0,0.45)]'>
				<ToothIcon size={24} />
			</span>
			<span className='font-display text-2xl font-extrabold'>Denta</span>
		</div>
	)
}
