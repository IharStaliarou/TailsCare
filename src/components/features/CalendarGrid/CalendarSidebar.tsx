import React from 'react'

import { COLORS_CONFIG } from '@/entities/calendar/calendar.constants'
import { IDayTile } from '@/entities/calendar/calendar.types'
import { DateUtils, isWeekend } from '@/entities/calendar/calendar.utils'

import { CalendarNavButtons } from './CalendarNavButtons'

interface ICalendarSidebarProps {
  monthLabel: string
  staticWeekdayLabels: string[]
  monthDays: IDayTile[]
  selectedDate: Date
  handleSelectDate: (date: Date) => void
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  isTodaySelected: boolean
}

export const CalendarSidebar = ({
  monthLabel,
  staticWeekdayLabels,
  monthDays,
  selectedDate,
  handleSelectDate,
  onPrev,
  onNext,
  onToday,

  isTodaySelected,
}: ICalendarSidebarProps) => {
  return (
    <aside className='flex flex-col gap-6'>
      <CalendarNavButtons
        onPrev={onPrev}
        onNext={onNext}
        onToday={onToday}
        isTodaySelected={isTodaySelected}
      />
      <div className='text-center text-sm font-semibold text-gray-900 capitalize'>
        {monthLabel}
      </div>

      <div className='grid grid-cols-7 gap-1 pb-1'>
        {staticWeekdayLabels.map((day, index) => (
          <div
            key={day}
            className={`text-center text-[10px] font-semibold tracking-tight uppercase ${
              isWeekend(index) ? COLORS_CONFIG.RED[600] : COLORS_CONFIG.GRAY[900]
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-7 gap-1'>
        {monthDays.map((day) => {
          const dateObj = DateUtils.createDateFromString(day.date)
          const isSelected = DateUtils.isSameDay(dateObj, selectedDate)
          const jsDay = dateObj.getDay()
          const isWeekendDay = isWeekend(jsDay)
          const outside = !day.inCurrentMonth

          if (outside) {
            return (
              <button
                key={day.date}
                type='button'
                onClick={() => handleSelectDate(dateObj)}
                className='flex items-center justify-center rounded-full p-1 text-xs font-medium'
              >
                <div className='flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-gray-300'>
                  {day.dayNumber}
                </div>
              </button>
            )
          }

          const buttonStyles = (() => {
            if (isSelected) {
              return `${COLORS_CONFIG.INDIGO[600]} ${COLORS_CONFIG.WHITE} shadow-sm`
            }
            if (day.isToday && isWeekendDay) {
              return `border ${COLORS_CONFIG.RED[500]} ${COLORS_CONFIG.RED[600]}`
            }
            if (day.isToday) {
              return ` bg-secondary text-white`
            }
            if (isWeekendDay) {
              return `${COLORS_CONFIG.RED[500]} hover:${COLORS_CONFIG.RED[50]}`
            }
            return `${COLORS_CONFIG.GRAY[700]} hover:${COLORS_CONFIG.GRAY[100]}`
          })()

          return (
            <button
              key={day.date}
              type='button'
              onClick={() => handleSelectDate(dateObj)}
              className='flex items-center justify-center rounded-full p-1 text-xs font-medium'
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${buttonStyles}`}
              >
                {day.dayNumber}
              </div>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
