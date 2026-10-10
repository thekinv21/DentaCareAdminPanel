'use client'

import { Smartphone } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { AuthHeading, AuthStack } from '@/widgets/auth-panel'

import { cn } from '@/shared/lib/cn'
import { Button } from '@/shared/ui/button'
import { inputLgClass } from '@/shared/ui/field'

import { useVerifyCode } from '../model/useVerifyCode'

export function VerifyPage() {
	const t = useTranslations('Verify')
	const verify = useVerifyCode()

	return (
		<AuthStack>
			<AuthHeading
				icon={<Smartphone size={26} aria-hidden='true' />}
				title={t('enterTheSmsCode')}
				subtitle={
					<>
						{t('weSentA6')}{' '}
						<span className='font-mono font-semibold text-ink'>
							+996 555 ••• 441
						</span>
					</>
				}
			/>
			<form
				noValidate
				onSubmit={verify.submit}
				className='flex flex-col gap-4.5'
			>
				<fieldset className='m-0 border-0 p-0'>
					<legend className='mb-2 text-[13px] leading-4.5 font-semibold'>
						{t('verificationCode')}
					</legend>
					<div className='grid grid-cols-6 gap-2'>
						{verify.cells.map(cell => (
							<input
								key={cell.index}
								inputMode='numeric'
								autoComplete={cell.index === 0 ? 'one-time-code' : 'off'}
								maxLength={1}
								aria-label={`${t('digit')} ${cell.index + 1}`}
								className={cn(
									inputLgClass,
									'h-15 p-0 text-center font-mono text-2xl font-semibold',
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
						className='mt-px size-4.5 shrink-0 accent-brand'
						{...verify.rememberProps}
					/>
					{t('dontAskOnThis')}
				</label>
				<Button
					type='submit'
					variant='primary'
					size='lg'
					block
					disabled={!verify.ready}
				>
					{t('verifyAndSignIn')}
				</Button>
			</form>
			<div className='flex flex-wrap justify-between gap-3 text-sm leading-5.5 text-ink-muted'>
				<span>
					{t('newCodeIn')} <span className='font-mono text-ink'>0:42</span>
				</span>
				<a
					href='#'
					className='font-semibold text-brand no-underline hover:underline'
				>
					{t('getTheCodeBy')}
				</a>
			</div>
		</AuthStack>
	)
}
