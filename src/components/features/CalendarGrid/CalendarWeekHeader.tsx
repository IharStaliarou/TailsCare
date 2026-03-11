import { COLORS_CONFIG, UI_TEXTS } from '@/entities/calendar/calendar.constants'
import {
  CalendarUtils,
  formatLocalDate,
  isWeekend,
} from '@/entities/calendar/calendar.utils'

interface ICalendarWeekHeaderProps {
  weekDates: Date[]
  locale: string
  selectedDateString: string
  today: Date
  goToDay: (date: string) => void
}

export const CalendarWeekHeader = ({
  weekDates,
  locale,
  selectedDateString,
  today,
  goToDay,
}: ICalendarWeekHeaderProps) => {
  return (
    <div className='grid grid-cols-[56px_repeat(7,minmax(0,1fr))] border-b border-gray-100 bg-gray-50/80 text-[11px] font-semibold text-gray-500'>
      <div className='px-2 py-2 text-right text-[10px] text-gray-400'>
        {UI_TEXTS.TIMEZONE_LABEL}
      </div>
      {weekDates.map((date) => {
        const label = CalendarUtils.createWeekDayFormatter(locale).format(date)
        const dayNumber = date.getDate()
        const dateKey = formatLocalDate(date)
        const isToday = dateKey === formatLocalDate(today)
        const isSelected = dateKey === selectedDateString
        const jsDay = date.getDay()
        const isWeekendDay = isWeekend(jsDay)

        return (
          <button
            key={date.toISOString()}
            type='button'
            onClick={() => goToDay(dateKey)}
            className='flex flex-col items-center gap-0.5 px-2 py-2 text-xs'
          >
            <span
              className={`tracking-tight uppercase ${
                isWeekendDay ? COLORS_CONFIG.RED[500] : COLORS_CONFIG.GRAY[500]
              }`}
            >
              {label}
            </span>
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                isSelected
                  ? `${COLORS_CONFIG.INDIGO[600]} ${COLORS_CONFIG.WHITE}`
                  : isToday && isWeekendDay
                    ? `border ${COLORS_CONFIG.RED[500]} ${COLORS_CONFIG.RED[600]}`
                    : isToday
                      ? `bg-secondary text-white`
                      : isWeekendDay
                        ? COLORS_CONFIG.RED[500]
                        : COLORS_CONFIG.GRAY[800]
              }`}
            >
              {dayNumber}
            </span>
          </button>
        )
      })}
    </div>
  )
}
