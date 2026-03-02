'use client'

import { getWeightRecordSchema, TWeightRecordFormValues } from '@/entities/pet/pet.schema'
import { usePetStore } from '@/entities/pet/pet.store'
import { IWeightHistoryPoint } from '@/entities/pet/pet.types'
import { TDictionary } from '@/shared/config/i18n'
import { useAppForm } from '@/shared/hooks/useAppForm'

const INITIAL_FORM_STATE: Partial<TWeightRecordFormValues> = {
  weight: undefined,
  date: new Date().toISOString().split('T')[0],
}

export const useWeightForm = (
  petId: string,
  dictionary: TDictionary,
  initialWeightData?: IWeightHistoryPoint,
  onSuccess?: () => void
) => {
  const schema = getWeightRecordSchema(dictionary)
  const { addWeightRecord } = usePetStore()

  const form = useAppForm<TWeightRecordFormValues>({
    initialValues: (initialWeightData
      ? { ...initialWeightData }
      : INITIAL_FORM_STATE) as TWeightRecordFormValues,
    schema,
    onSubmit: async (values) => {
      addWeightRecord(petId, values)
      if (onSuccess) onSuccess()
    },
  })

  return form
}
