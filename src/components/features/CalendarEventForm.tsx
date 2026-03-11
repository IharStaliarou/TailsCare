'use client'

import { AppButton, Input, Select } from '@/components/ui'
import { EVENT_TYPE_VALUES } from '@/entities/calendar/calendar.constants'
import {
  getCalendarEventSchema,
  TCalendarEventFormValues,
} from '@/entities/calendar/calendar.schema'
import { useCalendarStore } from '@/entities/calendar/calendar.store'
import { usePetStore } from '@/entities/pet/pet.store'
import { TDictionary } from '@/shared/config/i18n'
import { useAppForm } from '@/shared/hooks/useAppForm'
import { useMessages, useTranslations } from 'next-intl'

import { useCalendarViewModel } from './useCalendarViewModel'

// TODO: refactor

export const CalendarEventForm = () => {
  const t = useTranslations('dayPage.modals')
  const {
    selectedDateString,

    setIsCreateModalOpen,
  } = useCalendarViewModel()
  const dictionary = useMessages() as TDictionary
  const tCalendar = useTranslations('calendar')
  const tCommon = useTranslations('common')

  const { addEvent, updateEvent } = useCalendarStore()
  const pets = usePetStore((state) => state.pets)

  const defaultValues: TCalendarEventFormValues = {
    title: '',
    description: '',
    type: 'other',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    petId: pets[0]?.id ?? '',
  }

  const initialValues = useCalendarStore((state) =>
    state.events.find((event) => event.date === selectedDateString)
  )

  const isEditMode = !!initialValues

  const schema = getCalendarEventSchema(dictionary)

  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useAppForm<TCalendarEventFormValues>({
      initialValues: {
        ...defaultValues,
        ...initialValues,
      },
      schema,
      onSubmit: async (values) => {
        if (isEditMode && initialValues?.id) {
          updateEvent(initialValues.id, values)
        } else {
          addEvent(values)
        }

        setIsCreateModalOpen(false)
      },
    })

  const typeOptions = EVENT_TYPE_VALUES.map((value) => ({
    value,
    label: tCalendar(`types.${value}`),
  }))

  const petOptions = pets.map((pet) => ({
    value: pet.id,
    label: pet.name,
  }))

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 rounded-2xl bg-white'>
      <Input
        id='title'
        label={tCalendar('dayPage.form.title.label')}
        placeholder={tCalendar('dayPage.form.title.placeholder')}
        value={formData.title}
        onChange={(e) => handleChange('title', e.target.value)}
        error={errors.title}
        required
      />

      <Input
        id='description'
        label={tCalendar('dayPage.form.description.label')}
        placeholder={tCalendar('dayPage.form.description.placeholder')}
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
        error={errors.description}
      />

      <div className='grid gap-4 md:grid-cols-2'>
        <Input
          id='time'
          type='time'
          label={tCalendar('dayPage.form.time.label')}
          placeholder={tCalendar('dayPage.form.time.placeholder')}
          value={formData.time}
          onChange={(e) => handleChange('time', e.target.value)}
          error={errors.time}
          required
        />

        <Input
          id='date'
          type='date'
          label='Дата'
          value={formData.date}
          onChange={(e) => handleChange('date', e.target.value)}
          error={errors.date}
          required
        />
      </div>

      <Select
        label={tCalendar('dayPage.form.type.label')}
        options={typeOptions}
        value={formData.type}
        onChange={(value) =>
          handleChange('type', value as TCalendarEventFormValues['type'])
        }
        error={errors.type}
      />

      <Select
        label={tCalendar('dayPage.form.pet.label')}
        options={petOptions}
        value={formData.petId}
        onChange={(value) => handleChange('petId', value)}
        error={errors.petId}
      />

      <div className='mt-4 flex gap-4'>
        <AppButton
          type='submit'
          className='w-full'
          label={isSubmitting ? '...' : (t('addTitle') ?? tCommon('save'))}
          disabled={isSubmitting || pets.length === 0}
        />
      </div>
    </form>
  )
}
