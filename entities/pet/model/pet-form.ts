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
