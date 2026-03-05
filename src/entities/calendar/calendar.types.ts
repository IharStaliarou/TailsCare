export type TEventType = 'vet' | 'medication' | 'feeding' | 'walking' | 'other'

export interface ICalendarEvent {
  id: string
  petId: string
  title: string
  description?: string
  type: TEventType
  date: string
  time?: string
  isCompleted: boolean
}

export interface ICalendarState {
  events: ICalendarEvent[]
  addEvent: (event: ICalendarEvent) => void
  updateEvent: (id: string, data: Partial<ICalendarEvent>) => void
  deleteEvent: (id: string) => void
}
