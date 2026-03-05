import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { CALENDAR_LS_KEY } from './calendar.constants'
import { ICalendarEvent } from './calendar.types'

export interface ICalendarStore {
  events: ICalendarEvent[]

  addEvent: (event: Omit<ICalendarEvent, 'id' | 'createdAt' | 'isCompleted'>) => void
  updateEvent: (id: string, data: Partial<ICalendarEvent>) => void
  removeEvent: (id: string) => void
  toggleEventCompletion: (id: string) => void

  getEventsByDate: (date: string) => ICalendarEvent[]
  getEventsByPetId: (petId: string) => ICalendarEvent[]
}

export const useCalendarStore = create<ICalendarStore>()(
  persist(
    (set, get) => ({
      events: [],

      addEvent: (eventData) => {
        const newEvent: ICalendarEvent = {
          ...eventData,
          id: crypto.randomUUID(),
          isCompleted: false,
          createdAt: new Date().toISOString(),
        }
        // TODO: add sort util function
        set((state) => ({
          events: [...state.events, newEvent].sort((a, b) =>
            `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)
          ),
        }))
      },

      updateEvent: (id, data) => {
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, ...data } : event
          ),
        }))
      },

      removeEvent: (id) => {
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        }))
      },

      toggleEventCompletion: (id) => {
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, isCompleted: !event.isCompleted } : event
          ),
        }))
      },

      getEventsByDate: (date) => {
        return get().events.filter((event) => event.date === date)
      },

      getEventsByPetId: (petId) => {
        return get().events.filter((event) => event.petId === petId)
      },
    }),
    {
      name: CALENDAR_LS_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
)
