import { CALENDAR_CONFIG, TIME_CONFIG, WEEKEND_DAYS } from './calendar.constants'
import { ICalendarEvent, IDayTile, IWeekLabelOptions } from './calendar.types'

// TODO: refactor

export const formatLocalDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const generateCalendarDays = (
  allEvents: ICalendarEvent[],
  currentMonth: Date
): IDayTile[] => {
  const days: IDayTile[] = []

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate()

  const startWeekday = monthStart.getDay()
  if (startWeekday > 0) {
    const prevMonthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0)
    const prevMonthDays = prevMonthEnd.getDate()
    for (let i = startWeekday - 1; i >= 0; i--) {
      const current = new Date(prevMonthEnd)
      current.setDate(prevMonthDays - i)
      current.setHours(0, 0, 0, 0)

      const dateStr = formatLocalDate(current)
      const dayEvents = allEvents.filter((e) => e.date === dateStr)

      days.push({
        date: dateStr,
        dayNumber: current.getDate().toString(),
        isToday: current.getTime() === today.getTime(),
        hasEvents: dayEvents.length > 0,
        events: dayEvents,
        type: 'square',
        inCurrentMonth: false,
      })
    }
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const current = new Date(monthStart)
    current.setDate(day)
    current.setHours(0, 0, 0, 0)

    const dateStr = formatLocalDate(current)
    const dayEvents = allEvents.filter((e) => e.date === dateStr)

    days.push({
      date: dateStr,
      dayNumber: current.getDate().toString(),
      isToday: current.getTime() === today.getTime(),
      hasEvents: dayEvents.length > 0,
      events: dayEvents,
      type: 'square',
      inCurrentMonth: true,
    })
  }

  const remainder = (7 - (days.length % 7)) % 7
  if (remainder > 0) {
    for (let i = 1; i <= remainder; i++) {
      const current = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, i)
      current.setHours(0, 0, 0, 0)

      const dateStr = formatLocalDate(current)
      const dayEvents = allEvents.filter((e) => e.date === dateStr)

      days.push({
        date: dateStr,
        dayNumber: current.getDate().toString(),
        isToday: current.getTime() === today.getTime(),
        hasEvents: dayEvents.length > 0,
        events: dayEvents,
        type: 'square',
        inCurrentMonth: false,
      })
    }
  }

  return days
}

export const isWeekend = (jsDay: number): boolean =>
  jsDay === WEEKEND_DAYS.SUNDAY || jsDay === WEEKEND_DAYS.SATURDAY

export const DateUtils = {
  createDateFromString(date: string): Date {
    return new Date(`${date}${TIME_CONFIG.START_OF_DAY}`)
  },

  normalizeDate(date: Date): Date {
    const normalized = new Date(date)
    normalized.setHours(0, 0, 0, 0)
    return normalized
  },

  getWeekStart(date: Date): Date {
    const d = this.normalizeDate(date)
    const jsDay = d.getDay()
    d.setDate(d.getDate() - jsDay)
    return d
  },

  getWeekDates(weekStart: Date): Date[] {
    return Array.from({ length: CALENDAR_CONFIG.WEEK_DAYS }, (_, i) => {
      const d = new Date(weekStart)
      d.setDate(weekStart.getDate() + i)
      return d
    })
  },

  isSameDay(date1: Date, date2: Date): boolean {
    return formatLocalDate(date1) === formatLocalDate(date2)
  },
} as const

export const CalendarUtils = {
  createWeekDayFormatter(locale: string) {
    return new Intl.DateTimeFormat(locale, { weekday: 'short' })
  },

  createMonthFormatter(locale: string) {
    return new Intl.DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric',
    })
  },

  createShortMonthFormatter(locale: string) {
    return new Intl.DateTimeFormat(locale, { month: 'short' })
  },

  createFullDateFormatter(locale: string) {
    return new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  },

  generateWeekRangeLabel({ locale, start, end }: IWeekLabelOptions): string {
    const sameMonth = start.getMonth() === end.getMonth()
    const monthFormatter = this.createShortMonthFormatter(locale)

    const startDay = start.getDate()
    const endDay = end.getDate()

    if (sameMonth) {
      return `${startDay}–${endDay} ${monthFormatter.format(start)}`
    }

    return `${startDay} ${monthFormatter.format(start)} – ${endDay} ${monthFormatter.format(end)}`
  },

  getStaticWeekdayLabels(locale: string): string[] {
    const formatter = this.createWeekDayFormatter(locale)
    const base = new Date(2024, 0, 7)

    return Array.from({ length: CALENDAR_CONFIG.WEEK_DAYS }, (_, i) => {
      const d = new Date(base)
      d.setDate(base.getDate() + i)
      return formatter.format(d)
    })
  },
} as const
