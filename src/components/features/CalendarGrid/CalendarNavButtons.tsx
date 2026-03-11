'use client'

import { AppButton } from '@/components/ui'
import { useTranslations } from 'next-intl'

interface ICalendarNavButtonsProps {
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  isTodaySelected: boolean
}

export const CalendarNavButtons = ({
  onPrev,
  onNext,
  onToday,
  isTodaySelected,
}: ICalendarNavButtonsProps) => {
  const t = useTranslations('calendar')
  const variant = isTodaySelected ? 'secondary' : 'outline'

  return (
    <div className='flex gap-2'>
      <AppButton
        variant='outline'
        label='‹'
        onClick={onPrev}
        className='w-11.25 rounded-full'
      />
      <AppButton
        variant={variant}
        label={t('todayButton')}
        onClick={onToday}
        className={'flex-1 rounded-full'}
      />
      <AppButton
        variant='outline'
        label='›'
        onClick={onNext}
        className='w-11.25 rounded-full'
      />
    </div>
  )
}
