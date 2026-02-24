import { ReactNode } from 'react'

import { Header, MobileSidebar } from '@/components/widgets'
import { routing, TLocale } from '@/shared/config/i18n'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Nunito } from 'next/font/google'
import { notFound } from 'next/navigation'

const nunito = Nunito({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
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
      <body className={`flex min-h-screen flex-col bg-gray-100 ${nunito.variable}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className='mx-auto mt-20 mb-14 flex w-full max-w-360 flex-col justify-center px-4 md:mb-0 md:px-6 md:py-9.5 2xl:px-17'>
            <MobileSidebar />
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
