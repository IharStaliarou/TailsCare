'use client'

import { AppButton, ImageUploader, Input, RadioButtonGroup } from '@/components/ui'
import { formatsString } from '@/entities/pet/pet.constants'
import { TDictionary } from '@/shared/config/i18n'
import { useMessages, useTranslations } from 'next-intl'

import { FIELDS_CONFIG, usePetForm, usePetOptions } from './model'

export const AddPetForm = () => {
  const dictionary = useMessages() as TDictionary
  const tForm = useTranslations('forms.pet')
  const tCommon = useTranslations('common')

  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    usePetForm(dictionary)

  const {
    name,
    type,
    gender,
    breed,
    birthday,
    currentWeight,
    activityLevel,
    targetWeight,
    avatar,
  } = formData

  const { genderOptions, activityOptions, typeOptions } = usePetOptions()
  return (
    <form onSubmit={handleSubmit} className='grid gap-5 rounded-2xl pb-5 md:grid-cols-2'>
      <ImageUploader
        label={tForm('avatar.label')}
        placeholder={tForm('avatar.placeholder', { formats: formatsString })}
        error={errors.avatar}
        value={avatar as string}
        onChange={(file) => handleChange('avatar', file)}
      />
      <div>
        <div className='grid grid-cols-1 gap-4'>
          <Input
            id={FIELDS_CONFIG.name.id}
            type={FIELDS_CONFIG.name.type}
            value={name}
            label={tForm('name.label')}
            placeholder={tForm('name.placeholder')}
            onChange={(e) => handleChange(FIELDS_CONFIG.name.id, e.target.value)}
            error={errors.name}
            required={FIELDS_CONFIG.name.isRequired}
          />

          <RadioButtonGroup
            label={tForm('type.label')}
            name={tForm('type.label').toLowerCase()}
            options={typeOptions}
            selectedValue={type}
            onChange={(val) => handleChange(FIELDS_CONFIG.type.id, val)}
            error={errors.type}
            required={FIELDS_CONFIG.type.isRequired}
          />

          <RadioButtonGroup
            label={tForm('gender.label')}
            name={tForm('gender.label').toLowerCase()}
            options={genderOptions}
            selectedValue={gender}
            onChange={(val) => handleChange(FIELDS_CONFIG.gender.id, val)}
            error={errors.gender}
            required={FIELDS_CONFIG.gender.isRequired}
          />

          <Input
            id={FIELDS_CONFIG.breed.id}
            type={FIELDS_CONFIG.breed.type}
            value={breed}
            label={tForm('breed.label')}
            placeholder={tForm('breed.placeholder')}
            onChange={(e) => handleChange(FIELDS_CONFIG.breed.id, e.target.value)}
            error={errors.breed}
            required={FIELDS_CONFIG.breed.isRequired}
          />

          {/* TODO: remove default placeholder browser mask */}
          <Input
            id={FIELDS_CONFIG.birthday.id}
            value={birthday}
            type={FIELDS_CONFIG.birthday.type}
            label={tForm('birthday.label')}
            placeholder={tForm('birthday.placeholder')}
            onChange={(e) => handleChange(FIELDS_CONFIG.birthday.id, e.target.value)}
            error={errors.birthday}
            required={FIELDS_CONFIG.birthday.isRequired}
          />

          <RadioButtonGroup
            label={tForm('activity.label')}
            name={tForm('activity.label').toLowerCase()}
            options={activityOptions}
            selectedValue={activityLevel}
            onChange={(val) => handleChange(FIELDS_CONFIG.activityLevel.id, val)}
            error={errors.activityLevel}
            required={FIELDS_CONFIG.activityLevel.isRequired}
          />

          <Input
            id={FIELDS_CONFIG.currentWeight.id}
            type={FIELDS_CONFIG.currentWeight.type}
            value={currentWeight}
            label={tForm('currentWeight.label')}
            placeholder={tForm('currentWeight.placeholder')}
            onChange={(e) => handleChange(FIELDS_CONFIG.currentWeight.id, e.target.value)}
            error={errors.currentWeight}
            required={FIELDS_CONFIG.currentWeight.isRequired}
          />

          <Input
            id={FIELDS_CONFIG.targetWeight.id}
            type={FIELDS_CONFIG.targetWeight.type}
            value={targetWeight}
            label={tForm('targetWeight.label')}
            placeholder={tForm('targetWeight.placeholder')}
            onChange={(e) => handleChange(FIELDS_CONFIG.targetWeight.id, e.target.value)}
            error={errors.targetWeight}
            required={FIELDS_CONFIG.targetWeight.isRequired}
          />
        </div>

        <div className='flex gap-4 pt-4'>
          <AppButton
            type='submit'
            variant='outline'
            label={tCommon('cancel')}
            className='w-1/2'
          />
          <AppButton
            type='submit'
            label={isSubmitting ? '...' : tCommon('save')}
            className='w-1/2'
            disabled={isSubmitting}
          />
        </div>
      </div>
    </form>
  )
}
