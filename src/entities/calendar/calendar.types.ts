export type TEventType = 'vet' | 'medication' | 'feeding' | 'walking' | 'other'

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
