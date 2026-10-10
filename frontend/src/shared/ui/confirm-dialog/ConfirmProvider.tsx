'use client'

import { type ReactNode, useCallback, useRef, useState } from 'react'

import { ConfirmContext } from './ConfirmContext'
import { ConfirmDialog } from './ConfirmDialog'
import type { TConfirmOptions, TConfirmRequest } from './ConfirmTypes'

type TConfirmProviderProps = { children: ReactNode }

/**
 * Hosts the single global confirmation dialog; mount inside <ToastProvider>
 */
export function ConfirmProvider({ children }: TConfirmProviderProps) {
	const [request, setRequest] = useState<TConfirmRequest | null>(null)

	const nextKey = useRef(0)

	const confirm = useCallback((options: TConfirmOptions) => {
		nextKey.current += 1

		setRequest({ ...options, key: nextKey.current })
	}, [])

	return (
		<ConfirmContext.Provider value={confirm}>
			{children}
			{request && (
				<ConfirmDialog
					key={request.key}
					request={request}
					onClose={() => setRequest(null)}
				/>
			)}
		</ConfirmContext.Provider>
	)
}
