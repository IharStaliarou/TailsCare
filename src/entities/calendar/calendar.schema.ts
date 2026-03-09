import { TDictionary } from '@/shared/config/i18n'
import * as z from 'zod'

import { EVENT_TYPE_VALUES } from './calendar.constants'

export const getCalendarEventSchema = (dictionary: TDictionary) =>
  z.object({
    title: z.string().min(1, dictionary.validations.common.notEmpty),
    description: z
      .string()
      .optional()
      .transform((val) => val ?? ''),
    type: z.enum(EVENT_TYPE_VALUES, {
      error: () => ({
        message: dictionary.validations.common.notEmpty,
      }),
    }),
    date: z.string().min(1, dictionary.validations.common.notEmpty),
    time: z.string().min(1, dictionary.validations.common.notEmpty),
    petId: z.string().min(1, dictionary.validations.common.notEmpty),
  })

export type TCalendarEventFormValues = z.infer<ReturnType<typeof getCalendarEventSchema>>
