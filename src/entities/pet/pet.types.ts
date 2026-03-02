import { TPetFormValues, TWeightRecordFormValues } from './pet.schema'

export type TGender = 'male' | 'female'

export interface IWeightHistoryPoint extends TWeightRecordFormValues {
  id: string
}

export interface IPet extends Omit<TPetFormValues, 'avatar'> {
  id: string
  createdAt: string
  updatedAt: string
  avatar: string | null
  weightHistory: IWeightHistoryPoint[]
}
