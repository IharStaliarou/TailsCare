import { ACTIVITY_VALUES, GENDER_VALUES, TYPE_VALUES } from '@/entities/pet'
import { useTranslations } from 'next-intl'

export const usePetOptions = () => {
  const t = useTranslations('forms.pet')

  const typeOptions = TYPE_VALUES.map((value) => ({
    value: value,
    label: t(`type.options.${value}`),
  }))

  const genderOptions = GENDER_VALUES.map((value) => ({
    value: value,
    label: t(`gender.options.${value}`),
  }))

  const activityOptions = ACTIVITY_VALUES.map((value) => ({
    value: value,
    label: t(`activity.options.${value}.label`),
    description: t(`activity.options.${value}.description`),
  }))

  return { typeOptions, genderOptions, activityOptions }
}
