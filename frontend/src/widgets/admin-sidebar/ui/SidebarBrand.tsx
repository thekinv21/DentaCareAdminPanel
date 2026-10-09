import { LogoMark } from '@/shared/ui/logo'

type TSidebarBrandProps = {
	branch: string
}

export function SidebarBrand({ branch }: TSidebarBrandProps) {
	return (
		<div className='flex items-center gap-2.5 border-b border-line px-1 pt-0.5 pb-3 max-[1100px]:justify-center max-[1100px]:px-0 max-[720px]:border-0 max-[720px]:p-0'>
			<LogoMark />
			<span className='min-w-0 grow max-[1100px]:hidden'>
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
