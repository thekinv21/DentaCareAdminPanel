import type { TAuthTokens } from '@/shared/api'

export type TAuthUserType =
	'chief' | 'doctor' | 'assistant' | 'admin' | 'accountant'

export type TAuthBranch = 'alaToo' | 'jal'

export type TAuthUser = {
	id: string
	fullName: string
	type: TAuthUserType
	branch: TAuthBranch
	phone: string
	email: string
}

export type TSignInPayload = TAuthTokens & { user: TAuthUser }
