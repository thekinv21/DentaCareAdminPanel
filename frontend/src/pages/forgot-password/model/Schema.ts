import { z } from 'zod'

import { kgPhoneSchema } from '@/shared/lib/validation'

export const forgotSchema = z.object({ phone: kgPhoneSchema })

export type ForgotValues = z.infer<typeof forgotSchema>
