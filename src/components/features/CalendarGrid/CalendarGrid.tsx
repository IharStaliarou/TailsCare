import { CalendarDesktop } from './CalendarDesktop/CalendarDesktop'
import { CalendarMobile } from './CalendarMobile/CalendarMobile'

export const CalendarGrid = () => {
  return (
    <>
      <CalendarMobile />
      <CalendarDesktop />
    </>
  )
}
