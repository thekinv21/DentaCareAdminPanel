import { Check } from 'lucide-react'

import { ToothIcon } from '@/shared/ui/logo'

const FEATURES = [
	'Зубная формула',
	'SMS-напоминания',
	'Visa · MBANK · Компаньон · Optima',
]

const FOOTER_LINKS = ['Конфиденциальность', 'Условия', 'Поддержка']

/**
 * Left brand column of auth screens; hidden below 900px
 */
export function AuthBrandPanel() {
	return (
		<section
			aria-label='О Denta'
			className="relative flex w-[46%] max-w-[660px] shrink-0 flex-col justify-between gap-8 overflow-hidden bg-[#075955] px-12 py-10 text-white before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle,rgba(255,255,255,0.13)_1.5px,transparent_2px)] before:bg-[length:28px_28px] before:content-[''] max-[900px]:hidden"
		>
			<span className='pointer-events-none absolute -top-40 -right-[180px] size-[520px] rounded-full border border-white/15' />
			<span className='pointer-events-none absolute -top-20 -right-[100px] size-[360px] rounded-full border border-white/15' />

			<div className='relative flex items-center gap-3'>
				<span className='flex size-11 items-center justify-center rounded-[14px] bg-white text-[#075955] shadow-[0_10px_24px_-10px_rgba(0,0,0,0.45)]'>
					<ToothIcon size={24} />
				</span>
				<span className='font-display text-2xl font-extrabold'>Denta</span>
			</div>

			<div className='relative flex flex-col gap-7'>
				<p className='max-w-[500px] font-display text-[38px] leading-[46px] font-extrabold tracking-[-0.025em]'>
					Каждое кресло, каждый зуб — на одном спокойном экране.
				</p>

				<div
					aria-hidden='true'
					className='flex max-w-[400px] animate-float flex-col gap-3 rounded-3xl bg-white p-[18px] text-[#0D2A2E] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.5)]'
				>
					<div className='flex items-center justify-between'>
						<span className='text-xs font-bold tracking-[0.04em] text-[#AD3D17] uppercase'>
							Следующий · 12:00
						</span>
						<span className='size-2 rounded-full bg-[#AD3D17]' />
					</div>
					<div className='flex items-center gap-3'>
						<span className='flex size-11 items-center justify-center rounded-full bg-[#D3EFEB] font-bold text-[#075955]'>
							АТ
						</span>
						<div>
							<div className='font-display text-lg font-bold'>
								Айгуль Тойчубекова
							</div>
							<div className='text-[13px] text-[#476065]'>
								Лечение каналов · <span className='font-mono'>46</span> · Кресло
								1
							</div>
						</div>
					</div>
					<div className='flex flex-wrap gap-1.5'>
						<span className='rounded-full bg-[#FCE2DF] px-2.5 py-0.5 text-xs font-semibold text-[#B92F27]'>
							Аллергия: пенициллин
						</span>
						<span className='rounded-full bg-[#DFEBFA] px-2.5 py-0.5 text-xs font-semibold text-[#1D5DA3]'>
							ФОМС
						</span>
					</div>
				</div>

				<ul className='flex flex-wrap gap-2'>
					{FEATURES.map(feature => (
						<li
							key={feature}
							className='inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[13px] font-semibold'
						>
							<Check size={16} aria-hidden='true' />
							{feature}
						</li>
					))}
				</ul>
			</div>

			<div className='relative flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-white/75'>
				<span>© 2026 Denta · Бишкек</span>
				{FOOTER_LINKS.map(link => (
					<a
						key={link}
						href='#'
						className='text-inherit no-underline hover:text-white hover:underline'
					>
						{link}
					</a>
				))}
			</div>
		</section>
	)
}
