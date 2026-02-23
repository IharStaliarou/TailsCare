import {
  BellIcon,
  CalendarIcon,
  EarthIcon,
  HomeIcon,
  NavPlusIcon,
} from '@/components/icons'
import { ROUTES } from '@/shared/config/routes'

export const NAVIGATION_LINKS = {
  common: [
    { label: 'home', href: ROUTES.home, icon: EarthIcon },
    { label: 'pets', href: ROUTES.pets, icon: HomeIcon },
    { label: 'addPet', href: ROUTES.addPet, icon: NavPlusIcon },
    { label: 'calendar', href: ROUTES.calendar, icon: CalendarIcon },
    { label: 'notifications', href: ROUTES.notifications, icon: BellIcon },
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
