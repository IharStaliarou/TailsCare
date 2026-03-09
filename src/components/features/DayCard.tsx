'use client'

// TODO: refactor
import {
  CALENDAR_CONFIG,
  COLORS_CONFIG,
  DIMENSIONS,
  UI_TEXTS,
} from '@/entities/calendar/calendar.constants'
import { IDayTile } from '@/entities/calendar/calendar.types'
import { DateUtils } from '@/entities/calendar/calendar.utils'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'

const getDayName = (locale: string, date: string): string => {
  return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(
    DateUtils.createDateFromString(date)
  )
}

const getCardStyles = (isToday: boolean) => ({
  container: clsx(
    DIMENSIONS.DAY_CARD.SQUARE_MIN_HEIGHT,
    'cursor-pointer rounded-4xl border p-4 transition-all',
    isToday
      ? `${COLORS_CONFIG.INDIGO[600]} ${COLORS_CONFIG.INDIGO[600]} shadow-lg shadow-indigo-200`
      : `${COLORS_CONFIG.GRAY[100]} ${COLORS_CONFIG.WHITE} hover:${COLORS_CONFIG.INDIGO[200]}`
  ),
  dayNumber: clsx(
    'text-2xl font-black',
    isToday ? COLORS_CONFIG.WHITE : COLORS_CONFIG.GRAY[900]
  ),
  dayName: clsx(
    'text-[10px] font-bold tracking-wider uppercase',
    isToday ? 'text-indigo-200' : COLORS_CONFIG.GRAY[400]
  ),
})

const getCircleStyles = (isToday: boolean) => ({
  container: clsx(
    DIMENSIONS.DAY_CARD.CIRCLE_SIZE,
    'relative flex items-center justify-center rounded-full text-sm font-bold transition-all',
    'border-2',
    isToday
      ? `${COLORS_CONFIG.INDIGO[600]} ${COLORS_CONFIG.INDIGO[600]} ${COLORS_CONFIG.WHITE}`
      : `${COLORS_CONFIG.GRAY[100]} ${COLORS_CONFIG.WHITE} ${COLORS_CONFIG.GRAY[700]} group-hover:${COLORS_CONFIG.INDIGO[200]}`
  ),
})

export const DayCard = ({ day, onClick }: { day: IDayTile; onClick: () => void }) => {
  const t = useTranslations('calendar')
  const locale = useLocale()

  const dayName = getDayName(locale, day.date)
  const isSquare = day.type === 'square'
  const cardStyles = getCardStyles(day.isToday)

  if (isSquare) {
    return (
      <motion.div
        whileHover={{ y: CALENDAR_CONFIG.ANIMATION.HOVER_Y }}
        onClick={onClick}
        className={cardStyles.container}
      >
        <div className='mb-3 flex items-start justify-between'>
          <span className={cardStyles.dayNumber}>{day.dayNumber}</span>
          <span className={cardStyles.dayName}>{dayName}</span>
        </div>

        <div className='space-y-1.5'>
          {day.hasEvents ? (
            day.events.slice(0, CALENDAR_CONFIG.MAX_VISIBLE_EVENTS).map((event) => (
              <div
                key={event.id}
                className={clsx(
                  'truncate rounded-lg px-2 py-1 text-[10px] font-medium',
                  day.isToday
                    ? 'bg-white/20 text-white'
                    : `${COLORS_CONFIG.INDIGO[50]} ${COLORS_CONFIG.INDIGO[700]}`
                )}
              >
                {UI_TEXTS.BULLET_SYMBOL} {event.title}
              </div>
            ))
          ) : (
            <span
              className={clsx(
                'text-[11px]',
                day.isToday ? 'text-indigo-200' : COLORS_CONFIG.GRAY[400]
              )}
            >
              {t('noPlans')}
            </span>
          )}
          {day.events.length > CALENDAR_CONFIG.MAX_VISIBLE_EVENTS && (
            <div
              className={clsx(
                'pl-1 text-[9px] font-bold',
                day.isToday ? COLORS_CONFIG.WHITE : COLORS_CONFIG.INDIGO[500]
              )}
            >
              {UI_TEXTS.PLUS_SYMBOL}{' '}
              {day.events.length - CALENDAR_CONFIG.MAX_VISIBLE_EVENTS}
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <div
      onClick={onClick}
      className='group flex cursor-pointer flex-col items-center gap-2'
    >
      <span className='text-[10px] font-bold tracking-tighter text-gray-400 uppercase'>
        {dayName}
      </span>
      <div className={getCircleStyles(day.isToday).container}>
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
