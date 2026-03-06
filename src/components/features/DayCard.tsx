'use client'

import { IDayTile } from '@/entities/calendar/calendar.types'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'

export const DayCard = ({ day, onClick }: { day: IDayTile; onClick: () => void }) => {
  const t = useTranslations('calendar')
  const locale = useLocale()

  const dayName = new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(
    new Date(day.date)
  )
  const isSquare = day.type === 'square'

  if (isSquare) {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        onClick={onClick}
        className={clsx(
          'min-h-40 cursor-pointer rounded-4xl border p-4 transition-all',
          day.isToday
            ? 'border-indigo-600 bg-indigo-600 shadow-lg shadow-indigo-200'
            : 'border-gray-100 bg-white hover:border-indigo-200'
        )}
      >
        <div className='mb-3 flex items-start justify-between'>
          <span
            className={clsx(
              'text-2xl font-black',
              day.isToday ? 'text-white' : 'text-gray-900'
            )}
          >
            {day.dayNumber}
          </span>
          <span
            className={clsx(
              'text-[10px] font-bold tracking-wider uppercase',
              day.isToday ? 'text-indigo-200' : 'text-gray-400'
            )}
          >
            {dayName}
          </span>
        </div>

        <div className='space-y-1.5'>
          {day.hasEvents ? (
            day.events.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={clsx(
                  'truncate rounded-lg px-2 py-1 text-[10px] font-medium',
                  day.isToday ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-700'
                )}
              >
                • {event.title}
              </div>
            ))
          ) : (
            <span
              className={clsx(
                'text-[11px]',
                day.isToday ? 'text-indigo-200' : 'text-gray-400'
              )}
            >
              {t('noPlans')}
            </span>
          )}
          {day.events.length > 2 && (
            <div
              className={clsx(
                'pl-1 text-[9px] font-bold',
                day.isToday ? 'text-white' : 'text-indigo-500'
              )}
            >
              + {day.events.length - 2}
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  // Рендер Кружка
  return (
    <div
      onClick={onClick}
      className='group flex cursor-pointer flex-col items-center gap-2'
    >
      <span className='text-[10px] font-bold tracking-tighter text-gray-400 uppercase'>
        {dayName}
      </span>
      <div
        className={clsx(
          'relative flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold transition-all',
          'border-2',
          day.isToday
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : 'border-gray-100 bg-white text-gray-700 group-hover:border-indigo-200'
        )}
      >
        {day.dayNumber}
        {day.hasEvents && (
          <span className='absolute -top-1 -right-1 flex h-3 w-3'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75'></span>
            <span className='relative inline-flex h-3 w-3 rounded-full bg-indigo-500'></span>
          </span>
        )}
      </div>
    </div>
  )
}
