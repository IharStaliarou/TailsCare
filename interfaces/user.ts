// TODO: delete when schemas will be ready

export interface IUser {
  id: string
  mail: string
  phone: string
  name: string
  avatarUrl: string
  createdAt: Date
  updatedAt: Date
  pets: IPet[]
}
export type TGender = 'male' | 'female'
export interface IPet {
  id: string
  name: string
  type: string
  gender: TGender
  avatarUrl: string
  createdAt: Date
  updatedAt: Date
}
