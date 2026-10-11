'use client'

import { useTranslations } from 'next-intl'
import { useController, useFormContext } from 'react-hook-form'

import { LOCALE_META, type TLocale } from '@/shared/lib/i18n'
import { ToggleRow } from '@/shared/ui/toggle-row'

import type { TSettingsFormValues } from '../model/SettingsForm'

type TLanguageToggleRowProps = { locale: TLocale; isDefault: boolean }

/**
 * Whether staff may pick this interface language; the default one stays on
 */
export function LanguageToggleRow({
	locale,
	isDefault,
}: TLanguageToggleRowProps) {
	const t = useTranslations('Settings')
	const { control } = useFormContext<TSettingsFormValues>()
	const { field } = useController({ control, name: `languages.${locale}` })
	const isEnabled = isDefault || field.value
	const stateLabel = isDefault ? 'default' : isEnabled ? 'on' : 'off'

	return (
		<ToggleRow
			label={LOCALE_META[locale].name}
			leading={
				<span className='inline-flex size-8 shrink-0 items-center justify-center rounded-xl bg-sunken font-mono text-[11px] font-bold'>
					{LOCALE_META[locale].code}
				</span>
			}
			meta={
				<span className='text-[12.5px] text-ink-muted'>{t(stateLabel)}</span>
			}
			checked={isEnabled}
			disabled={isDefault}
			onChange={field.onChange}
		/>
	)
}
