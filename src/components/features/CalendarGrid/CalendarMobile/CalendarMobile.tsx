'use client'

import { useCalendarViewModel } from '@/components/features/useCalendarViewModel'
import { useCalendarStore } from '@/entities/calendar/calendar.store'

import { EmptyCalendarState } from '../CalendarDesktop/EmptyCalendarState'
import { EmptyPetsState } from '../CalendarDesktop/EmptyPetsState'
import { CalendarNavButtons } from '../CalendarNavButtons'
import { CalendarHeading } from './CalendarHeading'
import { Month } from './Month'

export const CalendarMobile = () => {
  const { events } = useCalendarStore()
  const { petsLength } = useCalendarViewModel()

  if (petsLength === 0) {
    return (
      <div className='mt-5 space-y-5 md:hidden'>
        <EmptyPetsState />
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className='mt-5 space-y-5 md:hidden'>
        <EmptyCalendarState />
      </div>
    )
  }

  return (
    <div className='mt-5 space-y-5 md:hidden'>
      <CalendarHeading />
      <CalendarNavButtons />

      <Month />
    </div>
  )
}
