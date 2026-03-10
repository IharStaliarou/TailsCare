import { CalendarDesktop } from '@/components/features/CalendarDesktop'
import { CalendarMobile } from '@/components/features/CalendarMobile'

export const CalendarGrid = () => {
  return (
    <>
      <CalendarMobile />
      <CalendarDesktop />
    </>
  )
}
