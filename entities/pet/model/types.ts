// TODO: delete when schemas will be ready

export type TGender = 'male' | 'female'

export interface IPet {
  id: string
  name: string
  type: string
  gender: TGender
  breed: string
  weight: number
  avatarUrl: string
  createdAt: Date
  updatedAt: Date
}
