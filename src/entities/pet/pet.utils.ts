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
    avatar: typeof validatedData.avatar === 'string' ? validatedData.avatar : null,
  }

  return newPet
}
