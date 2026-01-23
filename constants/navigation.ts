export const NAVIGATION_LINKS = {
  common: [
    { label: 'home', href: '/' },
    { label: 'calendar', href: '/calendar' },
    { label: 'pets', href: '/pets' },
    { label: 'settings', href: '/settings' },
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
