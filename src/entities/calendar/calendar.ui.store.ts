import { create } from 'zustand'

// TODO: refactor and persist

import { DateUtils } from './calendar.utils'

interface ICalendarUIState {
  selectedDate: Date
  currentMonth: Date
  isCreateModalOpen: boolean
  setSelectedDate: (date: Date) => void
  setCurrentMonth: (date: Date) => void
  setIsCreateModalOpen: (isOpen: boolean) => void
  goToToday: (today: Date) => void
}

export const useCalendarUIStore = create<ICalendarUIState>((set) => ({
  selectedDate: DateUtils.normalizeDate(new Date()),
  currentMonth: DateUtils.normalizeDate(new Date()),
  isCreateModalOpen: false,

  setSelectedDate: (date) => set({ selectedDate: DateUtils.normalizeDate(date) }),
  setCurrentMonth: (date) => set({ currentMonth: date }),
  setIsCreateModalOpen: (isOpen) => set({ isCreateModalOpen: isOpen }),

  goToToday: (today) =>
    set({
      selectedDate: DateUtils.normalizeDate(today),
      currentMonth: DateUtils.normalizeDate(today),
    }),
}))
