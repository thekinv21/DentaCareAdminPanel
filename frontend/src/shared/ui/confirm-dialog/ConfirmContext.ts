'use client'

import { createContext } from 'react'

import type { TConfirmOptions } from './ConfirmTypes'

export type TConfirm = (options: TConfirmOptions) => void

export const ConfirmContext = createContext<TConfirm | null>(null)
