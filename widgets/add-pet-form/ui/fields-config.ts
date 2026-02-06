export const FIELDS_CONFIG = {
  name: {
    id: 'name' as const,
    type: 'text',
  },
  avatar: {
    id: 'avatar' as const,
    type: 'file',
  },
  type: {
    id: 'type' as const,
    type: 'radio',
  },
  breed: {
    id: 'breed' as const,
    type: 'text',
  },
  birthday: {
    id: 'birthday' as const,
    type: 'date',
  },
  currentWeight: {
    id: 'currentWeight' as const,
    type: 'number',
  },
  targetWeight: {
    id: 'targetWeight' as const,
    type: 'number',
  },
  gender: {
    id: 'gender' as const,
    type: 'radio',
  },
  activityLevel: {
    id: 'activityLevel' as const,
    type: 'radio',
  },
}
