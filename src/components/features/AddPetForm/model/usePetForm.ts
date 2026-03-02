'use client'

import { getPetSchema, TPetFormValues } from '@/entities/pet/pet.schema'
import { usePetStore } from '@/entities/pet/pet.store'
import { IPet } from '@/entities/pet/pet.types'
import { preparePetData } from '@/entities/pet/pet.utils'
import { TDictionary } from '@/shared/config/i18n'
import { useAppForm } from '@/shared/hooks/useAppForm'

const INITIAL_FORM_STATE: Partial<TPetFormValues> = {
  name: '',
  type: undefined,
  gender: undefined,
  activityLevel: undefined,
  currentWeight: undefined,
  targetWeight: undefined,
  birthday: '',
  breed: '',
  avatar: null,
}

export const usePetForm = (
  dictionary: TDictionary,
  initialPetData?: IPet,
  onSuccess?: () => void
) => {
  const schema = getPetSchema(dictionary)
  const { addPet, updatePet, checkIsNameUnique } = usePetStore()

  const form = useAppForm<TPetFormValues>({
    initialValues: (initialPetData
      ? { ...initialPetData }
      : INITIAL_FORM_STATE) as TPetFormValues,
    schema,
    onSubmit: async (values) => {
      if (!initialPetData || initialPetData.name !== values.name) {
        if (!checkIsNameUnique(values.name)) {
          form.setErrors((prev) => ({
            ...prev,
            name: dictionary.validations.pet.name.nameUnique,
          }))
          return
        }
      }

      const petData = preparePetData(values, initialPetData)

      if (initialPetData) {
        updatePet(initialPetData.id, petData)
      } else {
        addPet(petData as IPet)
      }

      if (onSuccess) onSuccess()
    },
  })

  return form
}
