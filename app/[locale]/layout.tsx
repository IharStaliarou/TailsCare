import { ReactNode } from 'react'

import { Header } from '@/components/layout/Header/Header'
import { routing } from '@/i18n/routing'
import { TLocale } from '@/i18n/types'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
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
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className='bg-background flex min-h-screen flex-col antialiased'>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className='grow'>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
