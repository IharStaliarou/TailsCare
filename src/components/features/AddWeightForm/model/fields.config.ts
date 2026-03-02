export const FIELDS_CONFIG = {
  weight: {
    id: 'weight' as const,
    type: 'number',
    step: 0.1,
    isRequired: true,
  },
  date: {
    id: 'date' as const,
    type: 'date',
    isRequired: true,
  },
}
