'use client'

import { FormEvent, useCallback, useState } from 'react'

import { getPetSchema, TPetFormValues } from '@/entities/pet/pet.schema'
import { usePetStore } from '@/entities/pet/pet.store'
import { IPet } from '@/entities/pet/pet.types'
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

export const usePetForm = (dictionary: TDictionary) => {
  const schema = getPetSchema(dictionary)

  const [formData, setFormData] = useState(INITIAL_FORM_STATE)

  const [errors, setErrors] = useState<TFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { addPet, checkIsNameUnique } = usePetStore()

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
      const isUnique = checkIsNameUnique(validatedData.name)

      if (!isUnique) {
        setErrors((prev) => ({
          ...prev,
          name: dictionary.validations.pet.name.nameUnique,
        }))
        return
      }
      const now = new Date().toISOString()

      const newPet: IPet = {
        ...validatedData,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
        avatar: typeof validatedData.avatar === 'string' ? validatedData.avatar : null,
      }

      addPet(newPet)
      // TODO: add modal if ls limit > 90%
      // TODO: server action
      setFormData(INITIAL_FORM_STATE)
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
