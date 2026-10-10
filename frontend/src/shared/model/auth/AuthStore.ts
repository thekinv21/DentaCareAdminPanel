import { atomWithStorage } from 'jotai/utils'

import type { TAuthUser } from './Types'

export const authUserAtom = atomWithStorage<TAuthUser | null>(
	'authenticatedUser',
	null,
)
