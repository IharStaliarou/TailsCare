// TODO: delete when schemas will be ready

import type { IPet } from '@/entities/pet'

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

export const MOCK_USER: IUser = {
  id: 'wqe123we-qweqwe123-qweqwe123-ewwqe213',
  mail: 'example@gmail.com',
  phone: '375291231233',
  name: 'John Doe',
  avatarUrl: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  pets: [],
}
