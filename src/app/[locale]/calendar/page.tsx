import { CalendarGrid } from '@/components/features'

export default async function CalendarPage() {
  return (
    <section id='calendar-page' className='flex flex-col gap-8'>
      <CalendarGrid />
    </section>
  )
}
