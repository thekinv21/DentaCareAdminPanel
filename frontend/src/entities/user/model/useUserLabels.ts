'use client'

import { useTranslations } from 'next-intl'

import { BRANCH_LABEL, USER_TYPE } from './Maps'
import type { TBranch, TLastSeen, TUserType } from './Types'

/**
 * Translated user type, branch and "last seen" text
 */
export function useUserLabels() {
	const t = useTranslations('User')

	const type = (userType: TUserType) => t(USER_TYPE[userType].label)

	const typeHint = (userType: TUserType) => t(USER_TYPE[userType].hint)

	const typePlural = (userType: TUserType) => t(USER_TYPE[userType].plural)

	const branch = (userBranch: TBranch) => t(BRANCH_LABEL[userBranch])

	const lastSeen = (seen: TLastSeen) => {
		if ('date' in seen) return seen.date

		if ('time' in seen)
			return t(seen.kind === 'today' ? 'todayAt' : 'yesterdayAt', {
				time: seen.time,
			})

		return t(seen.kind === 'online' ? 'onlineNow' : 'inviteSent')
	}

	return { type, typeHint, typePlural, branch, lastSeen }
}
