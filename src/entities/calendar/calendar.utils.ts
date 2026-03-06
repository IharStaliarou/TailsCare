import { ICalendarEvent, IDayTile } from './calendar.types'

export const generateCalendarDays = (allEvents: ICalendarEvent[]): IDayTile[] => {
  const days: IDayTile[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i < 28; i++) {
    const current = new Date()
    current.setDate(today.getDate() + i)
    current.setHours(0, 0, 0, 0)

    const dateStr = current.toISOString().split('T')[0]
    const dayEvents = allEvents.filter((e) => e.date === dateStr)

    days.push({
      date: dateStr,
      dayNumber: current.getDate().toString(),
      isToday: i === 0,
      hasEvents: dayEvents.length > 0,
      events: dayEvents,
      type: i < 7 ? 'square' : 'circle',
    })
  }
  return days
}
