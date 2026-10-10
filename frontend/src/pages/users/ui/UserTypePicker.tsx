'use client'

import {
	Calculator,
	type LucideIcon,
	MonitorSmartphone,
	Star,
	UserRoundCheck,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import { type TUserType, USER_TYPES, useUserLabels } from '@/entities/user'

import { cn } from '@/shared/lib/cn'
import { FormSection } from '@/shared/ui/form-section'
import { ToothIcon } from '@/shared/ui/logo'

import type { TUserFormValues } from '../model/UserFormSchema'

const USER_TYPE_ICON: Record<TUserType, LucideIcon | typeof ToothIcon> = {
	chief: Star,
	doctor: ToothIcon,
	assistant: UserRoundCheck,
	admin: MonitorSmartphone,
	accountant: Calculator,
}

type TUserTypePickerProps = { onChange: (type: TUserType) => void }

export function UserTypePicker({ onChange }: TUserTypePickerProps) {
	const t = useTranslations('UserForm')

	const { control } = useFormContext<TUserFormValues>()

	const currentType = useWatch({ control, name: 'type' })

	return (
		<FormSection
			title={t('userType')}
			aside={
				<span className='text-[12.5px] text-ink-muted'>
					{t('fieldsDependOnType')}
				</span>
			}
		>
			<div
				role='radiogroup'
				aria-label={t('userType')}
				className='grid grid-cols-5 gap-2.5 max-laptop:grid-cols-3 max-mobile:grid-cols-2'
			>
				{USER_TYPES.map(type => (
					<UserTypeCard
						key={type}
						type={type}
						isSelected={currentType === type}
						onSelect={() => onChange(type)}
					/>
				))}
			</div>
		</FormSection>
	)
}

type TUserTypeCardProps = {
	type: TUserType
	isSelected: boolean
	onSelect: () => void
}

function UserTypeCard({ type, isSelected, onSelect }: TUserTypeCardProps) {
	const labels = useUserLabels()

	const Icon = USER_TYPE_ICON[type]

	return (
		<button
			type='button'
			role='radio'
			aria-checked={isSelected}
			onClick={onSelect}
			className={cn(
				'flex flex-col items-start gap-2 rounded-2xl p-3 text-left text-ink',
				isSelected
					? 'border-2 border-brand bg-brand-soft'
					: 'm-px border border-line bg-surface hover:bg-raised',
			)}
		>
			<span
				className={cn(
					'inline-flex size-9 items-center justify-center rounded-[11px]',
					isSelected ? 'bg-brand text-on-brand' : 'bg-sunken text-ink-muted',
				)}
			>
				<Icon size={18} aria-hidden='true' />
			</span>
			<span className='text-sm font-bold'>{labels.type(type)}</span>
			<span className='text-xs leading-4 text-ink-muted'>
				{labels.typeHint(type)}
			</span>
		</button>
	)
}
