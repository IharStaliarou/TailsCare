import { ReactNode } from 'react'

import { Header } from '@/components/layout/Header/Header'
import { routing } from '@/i18n/routing'
import { TLocale } from '@/i18n/types'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Lexend } from 'next/font/google'
import { notFound } from 'next/navigation'

const lexend = Lexend({
  variable: '--font-lexend',
  subsets: ['latin'],
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as TLocale)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={`${lexend.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className='w-full px-4 py-6 md:px-6 md:py-9.5 2xl:px-17'>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
