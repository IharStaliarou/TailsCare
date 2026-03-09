import { useMemo } from 'react'

import { useCalendarStore } from '@/entities/calendar/calendar.store'
import { formatLocalDate } from '@/entities/calendar/calendar.utils'

import { ICalendarEvent } from '../calendar.types'

// TODO: refactor

export const useCalendarEvents = (weekDates: Date[]) => {
  const events = useCalendarStore((state) => state.events)

  return useMemo(() => {
    const map = new Map<string, ICalendarEvent[]>()

    weekDates.forEach((date) => {
      const dateKey = formatLocalDate(date)
      map.set(
        dateKey,
        events
          .filter((event) => event.date === dateKey)
          .sort((a, b) => a.time.localeCompare(b.time))
      )
    })

    return map
  }, [events, weekDates])
}
