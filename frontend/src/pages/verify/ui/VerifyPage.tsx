'use client'

import { Smartphone } from 'lucide-react'

import { AuthHeading, AuthStack } from '@/widgets/auth-panel'

import { cn } from '@/shared/lib/cn'
import { useI18n } from '@/shared/lib/i18n'
import { Button } from '@/shared/ui/button'
import { inputLgClass } from '@/shared/ui/field'

import { useVerifyCode } from '../model/use-verify-code'

export function VerifyPage() {
	const { t } = useI18n()
	const verify = useVerifyCode()

	return (
		<AuthStack>
			<AuthHeading
				icon={<Smartphone size={26} aria-hidden='true' />}
				title={t('Введите код из SMS')}
				subtitle={
					<>
						{t('Мы отправили 6-значный код на')}{' '}
						<span className='font-mono font-semibold text-ink'>
							+996 555 ••• 441
						</span>
					</>
				}
			/>
			<form onSubmit={verify.onSubmit} className='flex flex-col gap-[18px]'>
				<fieldset className='m-0 border-0 p-0'>
					<legend className='mb-2 text-[13px] leading-[18px] font-semibold'>
						{t('Код подтверждения')}
					</legend>
					<div className='grid grid-cols-6 gap-2'>
						{verify.cells.map(cell => (
							<input
								key={cell.index}
								inputMode='numeric'
								autoComplete={cell.index === 0 ? 'one-time-code' : 'off'}
								maxLength={1}
								aria-label={`${t('Цифра')} ${cell.index + 1}`}
								className={cn(
									inputLgClass,
									'h-[60px] p-0 text-center font-mono text-2xl font-semibold',
									cell.filled && 'border-brand',
								)}
								{...cell.props}
							/>
						))}
					</div>
				</fieldset>
				<label className='inline-flex cursor-pointer items-start gap-2.5 text-sm leading-5'>
					<input
						type='checkbox'
						defaultChecked
						className='mt-px size-[18px] shrink-0 accent-brand'
					/>
					{t('Не спрашивать код на этом устройстве 30 дней')}
				</label>
				<Button
					type='submit'
					variant='primary'
					size='lg'
					block
					disabled={!verify.ready}
				>
					{t('Подтвердить и войти')}
				</Button>
			</form>
			<div className='flex flex-wrap justify-between gap-3 text-sm leading-[22px] text-ink-muted'>
				<span>
					{t('Новый код через')}{' '}
					<span className='font-mono text-ink'>0:42</span>
				</span>
				<a
					href='#'
					className='font-semibold text-brand no-underline hover:underline'
				>
					{t('Получить код звонком')}
				</a>
			</div>
		</AuthStack>
	)
}
