import { Fragment } from 'react'

import { CALENDAR_CONFIG } from '@/entities/calendar/calendar.constants'
import { ICalendarEvent } from '@/entities/calendar/calendar.types'
import { formatLocalDate } from '@/entities/calendar/calendar.utils'

interface ICalendarWeekGridProps {
  weekDates: Date[]
  eventsByDayAndHour: Map<string, ICalendarEvent[]>
  goToDay: (date: string) => void
}

export const CalendarWeekGrid = ({
  weekDates,
  eventsByDayAndHour,
  goToDay,
}: ICalendarWeekGridProps) => {
  const padHour = (hour: number) => hour.toString().padStart(2, '0')

  return (
    <div className='max-h-[calc(100vh-220px)] overflow-y-auto'>
      <div className='grid grid-cols-[56px_repeat(7,minmax(0,1fr))] text-[11px]'>
        {CALENDAR_CONFIG.HOURS.map((hour) => (
          <Fragment key={hour}>
            <div className='border-t border-gray-100 px-1 py-2 text-right text-[10px] text-gray-400'>
              {padHour(hour)}:00
            </div>

            {weekDates.map((date) => {
              const dateKey = formatLocalDate(date)
              const eventsForDay = eventsByDayAndHour.get(dateKey) || []
              const eventsInSlot = eventsForDay.filter((event: ICalendarEvent) =>
                event.time.startsWith(`${padHour(hour)}:`)
              )

              return (
                <div
                  key={`${dateKey}-${hour}`}
                  className='relative border-t border-gray-100 px-1 py-1 align-top'
                >
                  {eventsInSlot.map((event: ICalendarEvent) => (
                    <button
                      key={event.id}
                      type='button'
                      onClick={() => goToDay(event.date)}
                      className='mb-0.5 w-full rounded-md bg-indigo-50 px-1 py-0.5 text-left text-[10px] font-medium text-indigo-700 hover:bg-indigo-100'
                    >
                      <span className='block truncate'>{event.title}</span>
                    </button>
                  ))}
                </div>
              )
            })}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
