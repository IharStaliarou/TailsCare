import { routing } from './routing'

export type TLocale = (typeof routing.locales)[number]

export interface MessageObject {
  [key: string]: string | MessageObject
}
