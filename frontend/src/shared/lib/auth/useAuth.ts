'use client'

import { useAtomValue, useSetAtom } from 'jotai'

import {
	authUserAtom,
	isAuthenticatedAtom,
	signInAtom,
	signOutAtom,
} from '@/shared/model'

export function useAuth() {
	const user = useAtomValue(authUserAtom)

	const isAuthenticated = useAtomValue(isAuthenticatedAtom)

	const signIn = useSetAtom(signInAtom)

	const signOut = useSetAtom(signOutAtom)

	return { user, isAuthenticated, signIn, signOut }
}
