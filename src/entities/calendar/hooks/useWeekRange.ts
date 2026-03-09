import { useMemo } from 'react'

import { useLocale } from 'next-intl'

import { CALENDAR_CONFIG } from '../calendar.constants'
import { CalendarUtils, DateUtils } from '../calendar.utils'

// TODO: refactor

export const useWeekRange = (selectedDate: Date) => {
  const locale = useLocale()

  return useMemo(() => {
    const weekStart = DateUtils.getWeekStart(selectedDate)
    const weekDates = DateUtils.getWeekDates(weekStart)
    const weekRangeLabel = CalendarUtils.generateWeekRangeLabel({
      locale,
      start: weekDates[0],
      end: weekDates[CALENDAR_CONFIG.WEEK_DAYS - 1],
    })

    return { weekStart, weekDates, weekRangeLabel }
  }, [selectedDate, locale])
}
