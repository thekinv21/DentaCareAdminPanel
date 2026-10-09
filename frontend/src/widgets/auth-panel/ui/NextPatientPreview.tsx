'use client'

import { useI18n } from '@/shared/lib/i18n'

/**
 * Decorative floating appointment card on the brand panel (fixed light palette)
 */
export function NextPatientPreview() {
	const { t, format } = useI18n()
	return (
		<div
			aria-hidden='true'
			className='flex max-w-[400px] animate-float flex-col gap-3 rounded-3xl bg-white p-[18px] text-[#0D2A2E] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.5)]'
		>
			<div className='flex items-center justify-between'>
				<span className='text-xs font-bold tracking-[0.04em] text-[#AD3D17] uppercase'>
					{t('Следующий · 12:00')}
				</span>
				<span className='size-2 rounded-full bg-[#AD3D17]' />
			</div>
			<div className='flex items-center gap-3'>
				<span className='flex size-11 items-center justify-center rounded-full bg-[#D3EFEB] font-bold text-[#075955]'>
					{t('АТ')}
				</span>
				<div>
					<div className='font-display text-lg font-bold'>
						{format.name('Айгуль Тойчубекова')}
					</div>
					<div className='text-[13px] text-[#476065]'>
						{t('Лечение каналов')} · <span className='font-mono'>46</span> ·{' '}
						{t('Кресло 1')}
					</div>
				</div>
			</div>
			<div className='flex flex-wrap gap-1.5'>
				<span className='rounded-full bg-[#FCE2DF] px-2.5 py-0.5 text-xs font-semibold text-[#B92F27]'>
					{t('Аллергия: пенициллин')}
				</span>
				<span className='rounded-full bg-[#DFEBFA] px-2.5 py-0.5 text-xs font-semibold text-[#1D5DA3]'>
					{t('ФОМС')}
				</span>
			</div>
		</div>
	)
}
