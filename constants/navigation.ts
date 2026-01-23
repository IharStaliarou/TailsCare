export const NAVIGATION_LINKS = {
  common: [
    { label: 'home', href: '/' },
    { label: 'pets', href: '/pets' },
    { label: 'calendar', href: '/calendar' },
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
