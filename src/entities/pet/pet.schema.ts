import {
  PetActivityLevelEnum,
  PetGenderEnum,
  PetTypeEnum,
} from '@/entities/pet/pet.constants'
import { TDictionary } from '@/shared/config/i18n'
import * as z from 'zod'

import { ALLOWED_FILE_TYPES, formatsString, MAX_FILE_SIZE } from './pet.constants'

const avatarSchema = (dictionary: TDictionary) =>
  z
    .union([z.instanceof(File), z.string(), z.null()])
    .nullable()
    .optional()
    .refine(
      (file) => {
        if (!file || typeof file === 'string') return true
        return file.size <= MAX_FILE_SIZE
      },
      {
        message: dictionary.validations.pet.avatar.size.replace(
          '{size}',
          MAX_FILE_SIZE.toString().charAt(0)
        ),
      }
    )
    .refine(
      (file) => {
        if (!file || typeof file === 'string') return true
        return ALLOWED_FILE_TYPES.includes(file.type)
      },
      {
        message: dictionary.validations.pet.avatar.formats.replace(
          '{formats}',
          formatsString
        ),
      }
    )

export const getPetSchema = (dictionary: TDictionary) =>
  z.object({
    avatar: avatarSchema(dictionary),
    name: z
      .string()
      .min(1, dictionary.validations.common.notEmpty)
      .min(2, dictionary.validations.pet.name.min)
      .max(50, dictionary.validations.pet.name.max),
    type: z.enum(PetTypeEnum, {
      error: dictionary.validations.common.notEmpty,
    }),
    gender: z.enum(PetGenderEnum, {
      error: dictionary.validations.common.notEmpty,
    }),
    activityLevel: z.enum(PetActivityLevelEnum, {
      error: dictionary.validations.common.notEmpty,
    }),
    breed: z.string().optional(),
    birthday: z
      .string()
      .min(1, dictionary.validations.common.notEmpty)
      .refine(
        (date) => {
          const selectedDate = new Date(date)
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          selectedDate.setHours(0, 0, 0, 0)
          return selectedDate <= today
        },
        {
          message: dictionary.validations.pet.birthday.notFuture,
        }
      ),
    currentWeight: z.preprocess(
      (val) => (val === '' || val == null ? undefined : Number(val)),
      z.number().positive().optional()
    ),
    targetWeight: z.preprocess(
      (val) => (val === '' || val == null ? undefined : Number(val)),
      z.number().positive().optional()
    ),
  })

export const getWeightRecordSchema = (dictionary: TDictionary) =>
  z.object({
    weight: z.preprocess(
      (val) => (val === '' || val == null ? undefined : Number(val)),
      z
        .number({
          error: dictionary.validations.common.invalidNumber,
        })
        .min(0.5, dictionary.validations.common.notEmpty)
        .max(100, dictionary.validations.pet.weight.max)
        .positive(dictionary.validations.pet.weight.positive)
    ),
    date: z
      .string()
      .min(1, dictionary.validations.common.notEmpty)
      .refine((date) => new Date(date) <= new Date(), {
        message: dictionary.validations.pet.birthday.notFuture,
      }),
  })

export type TPetFormValues = z.infer<ReturnType<typeof getPetSchema>>
export type TWeightRecordFormValues = z.infer<ReturnType<typeof getWeightRecordSchema>>
