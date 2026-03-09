'use client'

import { useMemo, useState } from 'react'

import { CalendarEventForm } from '@/components/features/CalendarEventForm'
import { AppButton } from '@/components/ui'
import { Modal } from '@/components/ui/Modal'
import {
  COLORS_CONFIG,
  DIMENSIONS,
  ROUNDING,
} from '@/entities/calendar/calendar.constants'
import { useCalendarStore } from '@/entities/calendar/calendar.store'
import { ICalendarEvent } from '@/entities/calendar/calendar.types'
import { CalendarUtils, DateUtils } from '@/entities/calendar/calendar.utils'
import { usePetStore } from '@/entities/pet/pet.store'
import { useLocale, useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

interface IEventModalState {
  type: 'add' | 'edit' | 'delete' | null
  event: ICalendarEvent | null
}

export default function CalendarDayPage() {
  const { date } = useParams<{ date: string }>()
  const locale = useLocale()
  const tCalendar = useTranslations('calendar')
  const tCommon = useTranslations('common')

  const { getEventsByDate, removeEvent, toggleEventCompletion, _hasHydrated } =
    useCalendarStore()
  const { pets, _hasHydrated: petsHydrated } = usePetStore()

  const [modalState, setModalState] = useState<IEventModalState>({
    type: null,
    event: null,
  })

  const events = getEventsByDate(date)
  const isLoading = !_hasHydrated || !petsHydrated

  const formattedDate = useMemo(() => {
    try {
      const d = DateUtils.createDateFromString(date)
      return CalendarUtils.createFullDateFormatter(locale).format(d)
    } catch {
      return date
    }
  }, [date, locale])

  const petsMap = useMemo(() => new Map(pets.map((pet) => [pet.id, pet.name])), [pets])

  const handleOpenAddModal = () => setModalState({ type: 'add', event: null })
  const handleOpenEditModal = (event: ICalendarEvent) =>
    setModalState({ type: 'edit', event })
  const handleOpenDeleteModal = (event: ICalendarEvent) =>
    setModalState({ type: 'delete', event })
  const handleCloseModal = () => setModalState({ type: null, event: null })

  if (isLoading) {
    return (
      <section id='calendar-day-page' className='py-6'>
        <p className='text-sm text-gray-500'>{tCommon('loading')}</p>
      </section>
    )
  }

  return (
    <section id='calendar-day-page' className='flex flex-col gap-6 pt-4 pb-10'>
      <header className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-2xl font-extrabold tracking-tight text-gray-900'>
            {tCalendar('dayPage.title', { date: formattedDate })}
          </h1>
          <p className='mt-1 text-xs text-gray-500'>{date}</p>
        </div>

        <AppButton
          label={tCalendar('dayPage.addEvent')}
          onClick={handleOpenAddModal}
          disabled={pets.length === 0}
          className='w-full md:w-auto'
        />
      </header>

      {pets.length === 0 && (
        <p className='text-xs text-amber-600'>
          Для создания планов сначала добавьте питомца на странице &laquo;Питомцы&raquo;.
        </p>
      )}

      {events.length === 0 ? (
        <div
          className={`${ROUNDING.XL2} border border-dashed border-gray-200 ${COLORS_CONFIG.WHITE} p-6 text-center`}
        >
          <p className='text-sm font-medium text-gray-700'>
            {tCalendar('dayPage.empty')}
          </p>
          <p className='mt-2 text-xs text-gray-500'>
            {tCalendar('dayPage.timelineHint')}
          </p>
        </div>
      ) : (
        <div className='relative mt-2 space-y-6'>
          <div className='absolute top-0 bottom-0 left-4 w-px bg-gray-200' />

          {events.map((event) => {
            const petName = petsMap.get(event.petId)

            return (
              <div key={event.id} className='relative flex gap-4 pl-4'>
                <div className='flex flex-col items-center gap-1'>
                  <span className='text-xs font-medium text-gray-400'>{event.time}</span>
                  <span
                    className={`inline-flex ${DIMENSIONS.INDICATOR.SIZE} rounded-full bg-indigo-500 ring-4 ring-indigo-100`}
                  />
                </div>

                <div
                  className={`flex-1 ${ROUNDING.XL2} ${COLORS_CONFIG.WHITE} p-4 shadow-sm ring-1 ring-gray-100`}
                >
                  <div className='flex items-start justify-between gap-3'>
                    <div>
                      <h2 className='text-sm font-semibold text-gray-900'>
                        {event.title}
                      </h2>
                      {petName && (
                        <p className='mt-0.5 text-xs text-gray-500'>{petName}</p>
                      )}
                    </div>

                    <button
                      type='button'
                      onClick={() => toggleEventCompletion(event.id)}
                      className={`inline-flex items-center ${ROUNDING.FULL} border px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase`}
                    >
                      {event.isCompleted ? tCommon('close') : tCommon('continue')}
                    </button>
                  </div>

                  {event.description && (
                    <p className='mt-2 text-xs text-gray-700'>{event.description}</p>
                  )}

                  <div className='mt-3 flex items-center justify-between text-[11px] text-gray-400'>
                    <span>{tCalendar(`types.${event.type}`)}</span>
                    <div className='flex gap-3'>
                      <button
                        type='button'
                        className='font-semibold text-indigo-600 hover:text-indigo-700'
                        onClick={() => handleOpenEditModal(event)}
                      >
                        {tCommon('edit')}
                      </button>
                      <button
                        type='button'
                        className='font-semibold text-red-500 hover:text-red-600'
                        onClick={() => handleOpenDeleteModal(event)}
                      >
                        {tCommon('delete')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <Modal
        isOpen={modalState.type === 'add'}
        onClose={handleCloseModal}
        title={tCalendar('dayPage.modals.addTitle')}
      >
        <CalendarEventForm
          initialValues={{ date }}
          onSuccess={handleCloseModal}
          submitLabel={tCalendar('dayPage.modals.addTitle')}
        />
      </Modal>

      <Modal
        isOpen={modalState.type === 'edit'}
        onClose={handleCloseModal}
        title={tCalendar('dayPage.modals.editTitle')}
      >
        {modalState.event && (
          <CalendarEventForm
            initialValues={modalState.event}
            onSuccess={handleCloseModal}
            submitLabel={tCalendar('dayPage.modals.editTitle')}
          />
        )}
      </Modal>

      <Modal
        isOpen={modalState.type === 'delete'}
        onClose={handleCloseModal}
        title={tCalendar('dayPage.modals.deleteTitle')}
      >
        {modalState.event && (
          <div className='space-y-6'>
            <p className='text-center text-sm text-gray-700'>
              {tCalendar('dayPage.modals.deleteDescription', {
                title: modalState.event.title,
              })}
            </p>
            <div className='flex gap-4'>
              <AppButton
                variant='outline'
                label={tCalendar('dayPage.modals.deleteCancel')}
                className='flex-1'
                onClick={handleCloseModal}
              />
              <AppButton
                label={tCalendar('dayPage.modals.deleteConfirm')}
                className={`flex-1 ${COLORS_CONFIG.RED[500]} text-white hover:bg-red-600`}
                onClick={() => {
                  removeEvent(modalState.event!.id)
                  handleCloseModal()
                }}
              />
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
