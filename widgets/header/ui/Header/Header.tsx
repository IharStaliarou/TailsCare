import { MOCK_USER } from '@/entities/user'

import { HeaderClient } from './HeaderClient'

export const Header = () => {
  return <HeaderClient user={MOCK_USER} />
}
