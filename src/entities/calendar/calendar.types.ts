export type TEventType = 'vet' | 'medication' | 'feeding' | 'walking' | 'other'
// TODO: refactor

export interface ICalendarEvent {
  id: string
  petId: string
  title: string
  description?: string
  type: TEventType
  date: string
  time: string
  isCompleted: boolean
  createdAt: string
}

export interface IDayTile {
  date: string
  dayNumber: string
  isToday: boolean
  hasEvents: boolean
  events: ICalendarEvent[]
  type: 'square' | 'circle'
  inCurrentMonth: boolean
}

export interface IWeekRange {
  start: Date
  end: Date
  label: string
}

export interface IEventsByDayAndHour {
  [dateKey: string]: ICalendarEvent[]
}

export interface IModalState {
  isCreateOpen: boolean
  isEditOpen: boolean
  isDeleteOpen: boolean
  selectedEvent: ICalendarEvent | null
}

export interface IDateFormatterOptions {
  locale: string
  options?: Intl.DateTimeFormatOptions
}

export interface IWeekLabelOptions {
  locale: string
  start: Date
  end: Date
}
