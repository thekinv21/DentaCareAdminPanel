import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { removeTokens, saveTokens } from '@/shared/api'

import type { TAuthUser, TSignInPayload } from './Types'

export const authUserAtom = atomWithStorage<TAuthUser | null>(
	'authenticatedUser',
	null,
)

export const isAuthenticatedAtom = atom(get => get(authUserAtom) !== null)

export const signInAtom = atom(
	null,
	(_get, set, { user, ...tokens }: TSignInPayload) => {
		saveTokens(tokens)

		set(authUserAtom, user)
	},
)

export const signOutAtom = atom(null, (_get, set) => {
	removeTokens()

	set(authUserAtom, null)
})
