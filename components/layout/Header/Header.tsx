import { IUser } from '@/interfaces/user'

import { HeaderClient } from './HeaderClient'

export const Header = () => {
  const user: IUser = {
    id: 'wqe123we-qweqwe123-qweqwe123-ewwqe213',
    mail: 'example@gmail.com',
    phone: '375291231233',
    name: 'Ihar',
    avatarUrl: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    pets: [],
  }

  return <HeaderClient user={user} />
}
