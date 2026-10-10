'use client'

import { useAtomValue } from 'jotai'

import { authUserAtom } from '@/shared/model'

export function useAuth() {
	const user = useAtomValue(authUserAtom)

	return { user }
}
