import { TPetFormValues } from './pet.schema'
import { IPet } from './pet.types'

export const preparePetData = (
  validatedData: TPetFormValues,
  initialPetData?: IPet
): Partial<IPet> => {
  const now = new Date().toISOString()

  if (initialPetData) {
    return {
      ...validatedData,
      updatedAt: now,
      avatar:
        typeof validatedData.avatar === 'string'
          ? validatedData.avatar
          : initialPetData.avatar,
    }
  }

  const newPet: IPet = {
    ...validatedData,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    weightHistory: [
      {
        id: crypto.randomUUID(),
        weight: validatedData.currentWeight,
        date: now.split('T')[0],
      },
    ],
    avatar: typeof validatedData.avatar === 'string' ? validatedData.avatar : null,
  }

  return newPet
}

// TODO: remove any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatAge = (birthday: string, t: any): string => {
  const birthDate = new Date(birthday)
  const now = new Date()

  const diffTime = Math.abs(now.getTime() - birthDate.getTime())
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (totalDays < 7) {
    return `${totalDays} ${t('days')}`
  }

  if (totalDays < 30) {
    const weeks = Math.floor(totalDays / 7)
    const days = totalDays % 7
    return days > 0
      ? `${weeks} ${t('weeksShort')} ${days} ${t('daysShort')}`
      : `${weeks} ${t('weeks')}`
  }

  if (totalDays < 365) {
    const months = Math.floor(totalDays / 30.44)
    const days = Math.floor(totalDays % 30.44)
    const weeks = Math.floor(days / 7)

    return weeks > 0
      ? `${months} ${t('monthsShort')} ${weeks} ${t('weeksShort')}`
      : `${months} ${t('months')}`
  }

  const years = Math.floor(totalDays / 365.25)
  const remainingDays = Math.floor(totalDays % 365.25)
  const months = Math.floor(remainingDays / 30.44)

  return months > 0
    ? `${years} ${t('yearsShort')} ${months} ${t('monthsShort')}`
    : `${years} ${t('years')}`
}
