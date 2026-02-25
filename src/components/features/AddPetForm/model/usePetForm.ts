'use client'

import { FormEvent, useCallback, useState } from 'react'

import { getPetSchema, TPetFormValues } from '@/entities/pet/pet.schema'
import { usePetStore } from '@/entities/pet/pet.store'
import { IPet } from '@/entities/pet/pet.types'
import { preparePetData } from '@/entities/pet/pet.utils'
import { TDictionary } from '@/shared/config/i18n'
import { ZodError } from 'zod'

type TFormFieldValue = TPetFormValues[keyof TPetFormValues]
type TFormErrors = {
  [K in keyof TPetFormValues]?: string
}

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

  const [formData, setFormData] = useState<Partial<TPetFormValues>>(
    initialPetData ? { ...initialPetData } : INITIAL_FORM_STATE
  )

  const { addPet, updatePet, checkIsNameUnique } = usePetStore()
  const [errors, setErrors] = useState<TFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback(
    (name: keyof TPetFormValues, value: TFormFieldValue) => {
      setFormData((prev) => {
        const nextState = { ...prev, [name]: value }

        const validation = schema.safeParse(nextState)

        setErrors((current) => {
          const newErrors = { ...current }
          if (!validation.success) {
            const issue = validation.error.issues.find((i) => i.path.includes(name))
            newErrors[name] = issue?.message
          } else {
            newErrors[name] = undefined
          }
          return newErrors
        })

        return nextState
      })
    },
    [schema]
  )

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const validatedData = schema.parse(formData)

      if (!initialPetData || initialPetData.name !== validatedData.name) {
        const isUnique = checkIsNameUnique(validatedData.name)

        if (!isUnique) {
          setErrors((prev) => ({
            ...prev,
            name: dictionary.validations.pet.name.nameUnique,
          }))
          return
        }
      }

      const petData = preparePetData(validatedData, initialPetData)

      if (initialPetData) {
        updatePet(initialPetData.id, petData)
      } else {
        addPet(petData as IPet)
      }

      if (onSuccess) {
        onSuccess()
      }

      if (!initialPetData) {
        setFormData(INITIAL_FORM_STATE)
      }

      // TODO: server action
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {}
        error.issues.forEach((issue) => {
          if (issue.path[0]) newErrors[issue.path[0] as string] = issue.message
        })
        setErrors(newErrors)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  }
}
