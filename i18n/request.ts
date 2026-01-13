import { getRequestConfig } from 'next-intl/server'

import { routing } from './routing'
import { MessageObject, TLocale } from './types'

function mergeMessages(
  defaultMsgs: MessageObject,
  currentMsgs: MessageObject,
  locale: string,
  path = ''
): MessageObject {
  if (locale === routing.defaultLocale) return currentMsgs

  const result: MessageObject = { ...defaultMsgs }

  for (const key in defaultMsgs) {
    const currentPath = path ? `${path}.${key}` : key
    const defaultValue = defaultMsgs[key]
    const currentValue = currentMsgs[key]

    if (!(key in currentMsgs)) {
      console.warn(
        `\x1b[33m[i18n] Missing key "${currentPath}" in locale "${locale}". Using fallback.\x1b[0m`
      )
      continue
    }

    if (
      typeof defaultValue === 'object' &&
      defaultValue !== null &&
      typeof currentValue === 'object' &&
      currentValue !== null
    ) {
      result[key] = mergeMessages(
        defaultValue as MessageObject,
        currentValue as MessageObject,
        locale,
        currentPath
      )
    } else {
      result[key] = currentValue
    }
  }
  return result
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as TLocale)) {
    locale = routing.defaultLocale
  }

  const isDefault = locale === routing.defaultLocale

  const [userMessages, defaultMessages] = await Promise.all([
    import(`../messages/${locale}.json`).then((m) => m.default as MessageObject),
    isDefault
      ? Promise.resolve(null)
      : import(`../messages/${routing.defaultLocale}.json`).then(
          (m) => m.default as MessageObject
        ),
  ])

  const messages = defaultMessages
    ? mergeMessages(defaultMessages, userMessages, locale)
    : userMessages

  return {
    locale,
    messages,
    onError(error) {
      if (error.code === 'MISSING_MESSAGE') {
        console.error(`\x1b[31m[i18n] CRITICAL: ${error.message}\x1b[0m`)
      }
    },
  }
})
