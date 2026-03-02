'use client'

import { AppButton, Input } from '@/components/ui'
import { IPet } from '@/entities/pet/pet.types'
import { TDictionary } from '@/shared/config/i18n'
import { useMessages, useTranslations } from 'next-intl'

import { FIELDS_CONFIG, useWeightForm } from './model'

interface IAddWeightFormProps {
  pet: IPet
}

export const AddWeightForm = ({ pet }: IAddWeightFormProps) => {
  const dictionary = useMessages() as TDictionary
  const t = useTranslations('forms.weightHistory')
  const tCommon = useTranslations('common')

  const { id: petId } = pet
  const { formData, errors, isSubmitting, handleChange, handleSubmit } = useWeightForm(
    petId,
    dictionary
  )

  return (
    <form
      onSubmit={handleSubmit}
      className='flex h-34 flex-col gap-5 rounded-xl bg-white p-4 shadow-md md:flex-row'
    >
      <Input
        type={FIELDS_CONFIG.weight.type}
        step={FIELDS_CONFIG.weight.step}
        value={formData.weight}
        label={t('weight.label')}
        placeholder='0.0'
        onChange={(e) => handleChange(FIELDS_CONFIG.weight.id, Number(e.target.value))}
        error={errors.weight}
        required={FIELDS_CONFIG.weight.isRequired}
      />

      <Input
        type={FIELDS_CONFIG.date.type}
        value={formData.date}
        label={t('date.label')}
        onChange={(e) => handleChange(FIELDS_CONFIG.date.id, e.target.value)}
        error={errors.date}
        required={FIELDS_CONFIG.date.isRequired}
      />

      <AppButton
        type='submit'
        label={isSubmitting ? '...' : tCommon('add')}
        disabled={isSubmitting}
        className='h-12.5 self-center'
      />
    </form>
  )
}
