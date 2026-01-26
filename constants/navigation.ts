import { BellIcon } from '@/components/icons/BellIcon'
import { CalendarIcon } from '@/components/icons/CalendarIcon'
import { EarthIcon } from '@/components/icons/EarthIcon'
import { HomeIcon } from '@/components/icons/HomeIcon'
import { NavPlusIcon } from '@/components/icons/NavPlusIcon'

export const NAVIGATION_LINKS = {
  common: [
    { label: 'home', href: '/', icon: EarthIcon },
    { label: 'pets', href: '/pets', icon: HomeIcon },
    { label: 'addPet', href: '/pets/add', icon: NavPlusIcon },
    { label: 'calendar', href: '/calendar', icon: CalendarIcon },
    { label: 'notifications', href: '/notifications', icon: BellIcon },
  ] as const,
  unauth: [] as const,
  auth: [] as const,
}

/*
  If user is authenticated, show common links and auth links.
  If user is not authenticated, show common links and unauth links.
  @param {boolean} isAuthenticated
  @returns {Array} actual links
*/
export const getLinks = (isAuthenticated: boolean) => {
  const links = isAuthenticated
    ? [...NAVIGATION_LINKS.common, ...NAVIGATION_LINKS.auth]
    : [...NAVIGATION_LINKS.common, ...NAVIGATION_LINKS.unauth]
  return links
}
