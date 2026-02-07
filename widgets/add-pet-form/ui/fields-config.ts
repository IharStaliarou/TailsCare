export const FIELDS_CONFIG = {
  name: {
    id: 'name' as const,
    type: 'text',
    isRequired: true,
  },
  avatar: {
    id: 'avatar' as const,
    type: 'file',
    isRequired: false,
  },
  type: {
    id: 'type' as const,
    type: 'radio',
    isRequired: true,
  },
  breed: {
    id: 'breed' as const,
    type: 'text',
    isRequired: false,
  },
  birthday: {
    id: 'birthday' as const,
    type: 'date',
    isRequired: true,
  },
  currentWeight: {
    id: 'currentWeight' as const,
    type: 'number',
    isRequired: true,
  },
  targetWeight: {
    id: 'targetWeight' as const,
    type: 'number',
    isRequired: false,
  },
  gender: {
    id: 'gender' as const,
    type: 'radio',
    isRequired: true,
  },
  activityLevel: {
    id: 'activityLevel' as const,
    type: 'radio',
    isRequired: true,
  },
}
