import { ReactNode } from 'react'

import { routing } from '@/i18n/routing'
import { Locale } from '@/i18n/types'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className='bg-background min-h-screen antialiased'>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className='flex min-h-screen flex-col'>
            <main className='grow'>{children}</main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
