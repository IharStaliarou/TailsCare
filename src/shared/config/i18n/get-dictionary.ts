'use server'

import { TLocale } from './types'

const dictionaries = {
  ru: () => import('./messages/ru.json').then((module) => module.default),
  en: () => import('./messages/en.json').then((module) => module.default),
}

export const getDictionary = async (locale: TLocale) =>
  dictionaries[locale]?.() ?? dictionaries.ru()

export type TDictionary = Awaited<ReturnType<typeof getDictionary>>

export type DictionarySection<T extends keyof TDictionary> = TDictionary[T]

export type DictionaryNested<
  T extends keyof TDictionary,
  U extends keyof TDictionary[T],
> = TDictionary[T][U]
