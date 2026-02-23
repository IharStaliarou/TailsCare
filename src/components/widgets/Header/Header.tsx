import { MOCK_USER } from '@/entities/user/types'

import { HeaderClient } from './HeaderClient'

export const Header = () => {
  return <HeaderClient user={MOCK_USER} />
}
