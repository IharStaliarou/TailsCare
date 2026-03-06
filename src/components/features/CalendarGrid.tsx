'use client'

import { useMemo } from 'react'

import { useCalendarStore } from '@/entities/calendar/calendar.store'
import { generateCalendarDays } from '@/entities/calendar/calendar.utils'
import { useRouter } from 'next/navigation'

import { DayCard } from './DayCard'

export const CalendarGrid = () => {
  const router = useRouter()
  const events = useCalendarStore((state) => state.events)

  const days = useMemo(() => generateCalendarDays(events), [events])

  return (
    <div className='space-y-10 py-6'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-7'>
        {days.slice(0, 7).map((day) => (
          <DayCard
            key={day.date}
            day={day}
            onClick={() => router.push(`/calendar/${day.date}`)}
          />
        ))}
      </div>

      <div className='flex flex-wrap items-center justify-center gap-6 sm:justify-start'>
        {days.slice(7).map((day) => (
          <DayCard
            key={day.date}
            day={day}
            onClick={() => router.push(`/calendar/${day.date}`)}
          />
        ))}
      </div>
    </div>
  )
}
