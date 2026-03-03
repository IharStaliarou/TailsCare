'use client'

import { FormEvent, useCallback, useState } from 'react'

import { ZodError, ZodType } from 'zod'

interface IUseAppFormProps<T> {
  initialValues: T
  schema: ZodType<T>
  onSubmit: (values: T) => Promise<void> | void
}

export const useAppForm = <T extends Record<string, unknown>>({
  initialValues,
  schema,
  onSubmit,
}: IUseAppFormProps<T>) => {
  const [formData, setFormData] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback(
    <K extends keyof T>(name: K, value: T[K]) => {
      setFormData((prev) => {
        const nextState = { ...prev, [name]: value }

        const validation = schema.safeParse(nextState)

        setErrors((current) => {
          const newErrors = { ...current }
          if (!validation.success) {
            const issue = validation.error.issues.find((i) =>
              i.path.includes(name as string)
            )
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

    alert(JSON.stringify(formData))

    try {
      const validatedData = schema.parse(formData)
      await onSubmit(validatedData)
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: Partial<Record<keyof T, string>> = {}
        error.issues.forEach((issue) => {
          const path = issue.path[0] as keyof T
          if (path) {
            newErrors[path] = issue.message
          }
        })
        setErrors(newErrors)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    handleChange,
    handleSubmit,
  }
}
