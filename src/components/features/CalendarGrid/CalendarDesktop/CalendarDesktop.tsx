import { CalendarSidebar } from './CalendarSidebar'
import { WeekContent } from './WeekContent'

export const CalendarDesktop = () => {
  return (
    <div className='hidden min-h-160 gap-6 md:grid md:grid-cols-[280px_minmax(0,1fr)]'>
      <CalendarSidebar />
      <WeekContent />
    </div>
  )
}
