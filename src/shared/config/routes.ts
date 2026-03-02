export const ROUTES = {
  home: '/',
  pets: '/pets',
  addPet: '/add-pet',
  petDetails: (id: string) => `/pets/${id}`,
  calendar: '/calendar',
  notifications: '/notifications',
  faq: '/faq',
} as const
