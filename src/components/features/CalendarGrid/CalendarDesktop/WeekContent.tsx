'use client'

import { CalendarEventForm } from '@/components/features/CalendarEventForm'
import { useCalendarViewModel } from '@/components/features/useCalendarViewModel'
import { Modal } from '@/components/ui/Modal'
import { ROUNDING } from '@/entities/calendar/calendar.constants'
import { useTranslations } from 'next-intl'

import { CalendarWeekGrid } from '../CalendarWeekGrid'
import { CalendarWeekHeader } from '../CalendarWeekHeader'

export const WeekContent = () => {
  const t = useTranslations('calendar')

  const {
    isCreateModalOpen,

    setIsCreateModalOpen,
  } = useCalendarViewModel()

  return (
    <section className='flex min-h-160 flex-1 flex-col space-y-4'>
      <div
        className={`flex-1 overflow-hidden ${ROUNDING.XL2} bg-white shadow-sm ring-1 ring-gray-100`}
      >
        <CalendarWeekHeader />
        <CalendarWeekGrid />
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title={t('dayPage.modals.addTitle')}
      >
        <CalendarEventForm />
      </Modal>
    </section>
  )
}
