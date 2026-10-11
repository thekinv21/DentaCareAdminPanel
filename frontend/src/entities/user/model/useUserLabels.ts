'use client'

import { useTranslations } from 'next-intl'

import { BRANCH_LABEL, USER_TYPE } from './Maps'
import type { TBranch, TUserType } from './Types'

/**
 * Translated user type and branch
 */
export function useUserLabels() {
	const t = useTranslations('User')

	const type = (userType: TUserType) => t(USER_TYPE[userType].label)

	const typePlural = (userType: TUserType) => t(USER_TYPE[userType].plural)

	const branch = (userBranch: TBranch) => t(BRANCH_LABEL[userBranch])

	return { type, typePlural, branch }
}
