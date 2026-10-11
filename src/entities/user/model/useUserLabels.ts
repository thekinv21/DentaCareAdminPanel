'use client'

import { useTranslations } from 'next-intl'

import { BRANCH_LABEL, USER_TYPE } from './Maps'
import type { TBranch, TLastSeen, TUserType } from './Types'

/**
 * Translated user type, branch and "last seen" text
 */
export function useUserLabels() {
	const t = useTranslations('User')
	return {
		type: (type: TUserType) => t(USER_TYPE[type].label),
		typeHint: (type: TUserType) => t(USER_TYPE[type].hint),
		typePlural: (type: TUserType) => t(USER_TYPE[type].plural),
		branch: (branch: TBranch) => t(BRANCH_LABEL[branch]),
		lastSeen: (seen: TLastSeen) => {
			if ('date' in seen) return seen.date
			if ('time' in seen)
				return t(seen.kind === 'today' ? 'todayAt' : 'yesterdayAt', {
					time: seen.time,
				})
			return t(seen.kind === 'online' ? 'onlineNow' : 'inviteSent')
		},
	}
}
