import type { Metadata } from 'next'

import { Smartphone } from 'lucide-react'

import { AuthHeading, AuthStack } from '@/widgets/auth-panel'

import { VerifyCodeForm } from './VerifyCodeForm'

export const metadata: Metadata = { title: 'Подтверждение входа' }

export function VerifyPage() {
	return (
		<AuthStack>
			<AuthHeading
				icon={<Smartphone size={26} aria-hidden='true' />}
				title='Введите код из SMS'
				subtitle={
					<>
						Мы отправили 6-значный код на{' '}
						<span className='font-mono font-semibold text-ink'>
							+996 555 ••• 441
						</span>
					</>
				}
			/>
			<VerifyCodeForm />
			<div className='flex flex-wrap justify-between gap-3 text-sm leading-[22px] text-ink-muted'>
				<span>
					Новый код через <span className='font-mono text-ink'>0:42</span>
				</span>
				<a
					href='#'
					className='font-semibold text-brand no-underline hover:underline'
				>
					Получить код звонком
				</a>
			</div>
		</AuthStack>
	)
}
