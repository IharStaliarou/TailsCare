import { CalendarGrid } from '@/components/features'
import { getTranslations } from 'next-intl/server'

// TODO: refactor

export default async function CalendarPage() {
  const t = await getTranslations('calendar')

  return (
    <section id='calendar-page' className='flex flex-col gap-8 pt-4 pb-10'>
      {/* Мобильный заголовок, на десктопе заголовок внутри сайдбара календаря */}
      <header className='space-y-2 md:hidden'>
        <h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>
          {t('title')}
        </h1>
        <p className='max-w-2xl text-sm text-gray-500'>{t('subtitle')}</p>
      </header>

      <CalendarGrid />
    </section>
  )
}
