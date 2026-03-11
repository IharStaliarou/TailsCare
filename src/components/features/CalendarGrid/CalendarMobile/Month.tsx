'use client'

import { useCalendarViewModel } from '@/components/features/useCalendarViewModel'
import { AppButton } from '@/components/ui'
import { isWeekend } from '@/entities/calendar/calendar.utils'

export const Month = () => {
  const { staticWeekdayLabels, monthDays, goToDay } = useCalendarViewModel()

  const MonthHeader = (
    <div className='grid grid-cols-7 gap-1 text-center'>
      {staticWeekdayLabels.map((day, index) => (
        <span
          key={day}
          className={`text-[10px] font-semibold tracking-tight uppercase ${
            isWeekend(index) ? 'text-red-500' : 'text-gray-900'
          }`}
        >
          {day}
        </span>
      ))}
    </div>
  )

  const Days = (
    <div className='grid grid-cols-7 gap-1'>
      {monthDays.map((day) => {
        const { inCurrentMonth, date, dayNumber } = day
        const outside = !inCurrentMonth

        return (
          <AppButton
            key={date}
            label={dayNumber}
            onClick={() => goToDay(date)}
            className='h-20'
            variant={outside ? 'outline' : 'secondary'}
          />
        )
      })}
    </div>
  )

  return (
    <>
      {MonthHeader}
      {Days}
    </>
  )
}
