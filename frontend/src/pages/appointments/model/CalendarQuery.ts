import type { TDoctorId } from '@/entities/employee'

export type TCalendarView = 'day' | 'week' | 'month'

/**
 * Query of the calendar: visible range and the dentists shown in it
 */
export type TCalendarQuery = {
	view: TCalendarView
	date: string
	doctors: TDoctorId[]
}
