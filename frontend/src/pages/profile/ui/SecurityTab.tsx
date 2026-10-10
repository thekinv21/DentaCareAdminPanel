'use client'

import { Monitor } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Field, formGrid3, inputClass } from '@/shared/ui/field'
import { ToggleRow } from '@/shared/ui/toggle-row'

import type { TProfileFormValues } from '../model/ProfileForm'
import type { TProfileSettingsModel } from '../model/useProfileSettings'

type TSecurityTabProps = { model: TProfileSettingsModel }

export function SecurityTab({ model }: TSecurityTabProps) {
	const t = useTranslations('Profile')
	const { control, register } = useFormContext<TProfileFormValues>()

	return (
		<div className='flex animate-fade flex-col gap-5.5 pt-0.5 pb-2'>
			<div>
				<p className='mb-2.5 font-display text-[15px] leading-6 font-bold'>
					{t('changePassword')}
				</p>
				<div className={formGrid3}>
					<Field label={t('currentPassword')}>
						<input
							className={inputClass}
							type='password'
							placeholder='••••••••••'
							autoComplete='current-password'
							{...register('password.current')}
						/>
					</Field>
					<Field label={t('newPassword')}>
						<input
							className={inputClass}
							type='password'
							placeholder={t('atLeast10Characters')}
							autoComplete='new-password'
							{...register('password.next')}
						/>
					</Field>
					<Field label={t('repeatPassword')}>
						<input
							className={inputClass}
							type='password'
							placeholder={t('repeatPlaceholder')}
							autoComplete='new-password'
							{...register('password.repeat')}
						/>
					</Field>
				</div>
				<p className='mt-2 text-[12.5px] leading-4.5 text-ink-muted'>
					{t('passwordWasChanged64')}
				</p>
			</div>

			<div className='rounded-2xl border border-line px-3.5 py-1'>
				{model.security.map(option => (
					<Controller
						key={option.id}
						control={control}
						name={`prefs.${option.id}`}
						render={({ field }) => (
							<ToggleRow
								label={option.label}
								hint={option.hint}
								checked={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
				))}
			</div>

			<div>
				<div className='mb-1.5 flex flex-wrap items-center justify-between gap-2.5'>
					<p className='font-display text-[15px] leading-6 font-bold'>
						{t('activeSessions')}
					</p>
					<Button
						size='sm'
						className='text-danger'
						onClick={model.endOtherSessions}
					>
						{t('endAllExceptCurrent')}
					</Button>
				</div>
				<ul>
					{model.sessions.map(session => (
						<li
							key={session.id}
							className='flex items-center gap-3.5 border-b border-line py-3 last:border-b-0'
						>
							<span className='inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-sunken'>
								<Monitor size={18} aria-hidden='true' />
							</span>
							<div className='min-w-0 grow'>
								<div className='flex items-center gap-2'>
									<span className='font-semibold'>{session.device}</span>
									{session.current && (
										<Badge tone='ok'>{t('thisSession')}</Badge>
									)}
								</div>
								<p className='text-[12.5px] leading-4.5 text-ink-muted'>
									{session.where}
								</p>
							</div>
							<span className='font-mono text-[12.5px] whitespace-nowrap text-ink-muted'>
								{session.when}
							</span>
							{!session.current && (
								<Button size='sm' onClick={session.end}>
									{t('endSession')}
								</Button>
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
