'use server'

import { TLocale } from './types'

const dictionaries = {
  ru: () => import('../messages/ru.json').then((module) => module.default),
  en: () => import('../messages/en.json').then((module) => module.default),
}

export const getDictionary = async (locale: TLocale) =>
  dictionaries[locale]?.() ?? dictionaries.ru()

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>

export type DictionarySection<T extends keyof Dictionary> = Dictionary[T]

export type DictionaryNested<
  T extends keyof Dictionary,
  U extends keyof Dictionary[T],
> = Dictionary[T][U]
