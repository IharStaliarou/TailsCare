export const NAV_LINKS = {
  common: [
    { label: 'navigation.home', href: '/' },
    { label: 'navigation.calendar', href: '/calendar' },
    { label: 'navigation.pets', href: '/pets' },
    { label: 'navigation.settings', href: '/settings' },
  ],
  unauth: [],
  auth: [],
}

/*
  If user is authenticated, show common links and auth links.
  If user is not authenticated, show common links and unauth links.
  @param {boolean} isAuthenticated
  @returns {Array} actual links
*/
export const getLinks = (isAuthenticated: boolean) =>
  isAuthenticated
    ? [...NAV_LINKS.common, ...NAV_LINKS.auth]
    : [...NAV_LINKS.common, ...NAV_LINKS.unauth]
