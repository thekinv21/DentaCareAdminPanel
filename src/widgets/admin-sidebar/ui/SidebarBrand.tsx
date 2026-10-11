import { LogoMark } from '@/shared/ui/logo'

type TSidebarBrandProps = {
	branch: string
}

export function SidebarBrand({ branch }: TSidebarBrandProps) {
	return (
		<div className='flex items-center gap-2.5 border-b border-line px-1 pt-0.5 pb-3 max-laptop:justify-center max-laptop:px-0 max-mobile:border-0 max-mobile:p-0'>
			<LogoMark />
			<span className='min-w-0 grow max-laptop:hidden'>
				<span className='block font-display text-lg leading-5.5 font-extrabold tracking-[-0.01em]'>
					Denta
				</span>
				<span className='block truncate text-[12.5px] leading-4.5 text-ink-muted'>
					{branch}
				</span>
			</span>
		</div>
	)
}
