'use client'

import { useMemo } from 'react'

import { UI_TEXTS } from '@/entities/calendar/calendar.constants'
import { useCalendarStore } from '@/entities/calendar/calendar.store'
import { ICalendarEvent, IDayTile } from '@/entities/calendar/calendar.types'
import { useCalendarUIStore } from '@/entities/calendar/calendar.ui.store'
import {
  CalendarUtils,
  DateUtils,
  formatLocalDate,
  generateCalendarDays,
} from '@/entities/calendar/calendar.utils'
import { useCalendarEvents } from '@/entities/calendar/hooks/useCalendarEvents'
import { useWeekRange } from '@/entities/calendar/hooks/useWeekRange'
import { usePetStore } from '@/entities/pet/pet.store'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export interface ICalendarViewModel {
  t: ReturnType<typeof useTranslations>
  locale: string

  today: Date
  selectedDate: Date
  currentMonth: Date
  monthLabel: string
  staticWeekdayLabels: string[]
  monthDays: IDayTile[]
  weekDates: Date[]
  weekRangeLabel: string
  eventsByDayAndHour: Map<string, ICalendarEvent[]>
  petsLength: number
  isCreateModalOpen: boolean
  selectedDateString: string
  isTodaySelected: boolean
  todayLabel: string

  handlePrevMonth: () => void
  handleNextMonth: () => void
  handleSelectDate: (date: Date) => void
  goToDay: (date: string) => void
  goToToday: (date: Date) => void
  setIsCreateModalOpen: (open: boolean) => void
}

export const useCalendarViewModel = (): ICalendarViewModel => {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('calendar')

  const events = useCalendarStore((s) => s.events)
  const petsLength = usePetStore((s) => s.pets.length)

  const today = useMemo(() => DateUtils.normalizeDate(new Date()), [])

  const {
    selectedDate,
    currentMonth,
    isCreateModalOpen,
    setSelectedDate,
    setCurrentMonth,
    setIsCreateModalOpen,
    goToToday,
  } = useCalendarUIStore()

  const selectedDateString = useMemo(() => formatLocalDate(selectedDate), [selectedDate])

  const monthLabel = useMemo(
    () => CalendarUtils.createMonthFormatter(locale).format(currentMonth),
    [currentMonth, locale]
  )

  const staticWeekdayLabels = useMemo(
    () => CalendarUtils.getStaticWeekdayLabels(locale),
    [locale]
  )

  const monthDays = useMemo(
    () => generateCalendarDays(events, currentMonth),
    [events, currentMonth]
  )

  const { weekDates, weekRangeLabel } = useWeekRange(selectedDate)
  const eventsByDayAndHour = useCalendarEvents(weekDates)

  const handlePrevMonth = () => {
    const d = new Date(currentMonth)
    d.setMonth(currentMonth.getMonth() - 1)
    setCurrentMonth(d)
  }

  const handleNextMonth = () => {
    const d = new Date(currentMonth)
    d.setMonth(currentMonth.getMonth() + 1)
    setCurrentMonth(d)
  }

  const handleSelectDate = (date: Date) => {
    const normalized = DateUtils.normalizeDate(date)
    setSelectedDate(normalized)
    setCurrentMonth(normalized)
  }

  const goToDay = (date: string) => {
    router.push(`/calendar/${date}`)
  }

  const isTodaySelected = selectedDateString === formatLocalDate(today)
  const todayLabel = UI_TEXTS.TODAY_BUTTON

  return {
    t,
    locale,
    today,
    selectedDate,
    currentMonth,
    monthLabel,
    staticWeekdayLabels,
    monthDays,
    weekDates,
    weekRangeLabel,
    eventsByDayAndHour,
    petsLength,
    isCreateModalOpen,
    selectedDateString,
    isTodaySelected,
    todayLabel,
    handlePrevMonth,
    handleNextMonth,
    handleSelectDate,
    goToDay,
    goToToday,
    setIsCreateModalOpen,
  }
}
