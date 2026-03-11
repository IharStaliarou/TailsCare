import { CalendarNavButtons } from '../CalendarNavButtons'
import { CalendarHeading } from './CalendarHeading'
import { Month } from './Month'

export const CalendarMobile = () => {
  return (
    <div className='mt-5 space-y-5 md:hidden'>
      <CalendarHeading />
      <CalendarNavButtons />

      <Month />
    </div>
  )
}
