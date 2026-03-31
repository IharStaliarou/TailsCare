'use client'

import { useCalendarViewModel } from '@/components/features/useCalendarViewModel'
import { AppButton } from '@/components/ui'
import { isWeekend } from '@/entities/calendar/calendar.utils'

interface IMonthProps {
  disabled?: boolean
}

export const Month = ({ disabled }: IMonthProps) => {
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
            className='relative h-20'
            variant={outside ? 'outline' : 'secondary'}
            disabled={disabled}
          >
            {day.hasEvents && (
              <span className='absolute top-1 right-1 flex h-2 w-2'>
                <span className='bg-secondary-active absolute inline-flex h-full w-full animate-ping rounded-full opacity-75'></span>
                <span className='bg-secondary-active relative inline-flex h-2 w-2 rounded-full'></span>
              </span>
            )}
          </AppButton>
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
