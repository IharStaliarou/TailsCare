export enum PetTypeEnum {
  CAT = 'cat',
  DOG = 'dog',
}

export enum PetGenderEnum {
  MALE = 'male',
  FEMALE = 'female',
}

export enum PetActivityLevelEnum {
  LOW = 'low',
  MODERATE = 'moderate',
  HIGH = 'high',
}

export const TYPE_VALUES = Object.values(PetTypeEnum)
export const GENDER_VALUES = Object.values(PetGenderEnum)
export const ACTIVITY_VALUES = Object.values(PetActivityLevelEnum)

export const MAX_FILE_SIZE = 5 * 1024 * 1024
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const formatsString = ALLOWED_FILE_TYPES.map((t) =>
  t.split('/')[1].toUpperCase()
).join(', ')

export const PET_LS_KEY = 'tails-care-pets-local-storage-data-key'

export const DEFAULT_PET_AVATAR: Record<PetTypeEnum, string> = {
  [PetTypeEnum.CAT]: '/image2.png',
  [PetTypeEnum.DOG]: '/image1.png',
}
