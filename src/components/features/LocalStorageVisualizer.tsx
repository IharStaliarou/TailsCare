'use client'

import { usePetStore } from '@/entities/pet/pet.store'
import {
  MIN_SIZE_WARNING_THRESHOLD,
  STORAGE_WARNING_THRESHOLD,
} from '@/shared/constants/localStorage.constants'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

interface ILocalStorageVisualizerProps {
  className?: string
}

export const LocalStorageVisualizer = ({ className }: ILocalStorageVisualizerProps) => {
  const t = useTranslations('localStorage.banner')
  const { storageUsagePercent } = usePetStore()

  if (storageUsagePercent < MIN_SIZE_WARNING_THRESHOLD) return null // Не мозолим глаза, если места много

  const isWarning = storageUsagePercent > STORAGE_WARNING_THRESHOLD

  return (
    <div
      className={clsx(
        'flex min-w-80 flex-col gap-1 rounded-lg bg-white p-4 shadow-md',
        className
      )}
    >
      <div className='flex justify-between text-sm font-medium'>
        <span>{isWarning ? t('almostFull') : t('usage')}</span>
        <span className='font-bold text-gray-900'>{storageUsagePercent}%</span>
      </div>

      <div className='h-2 w-full overflow-hidden rounded bg-gray-100'>
        <div
          className={clsx(
            'h-full transition-all duration-500',
            isWarning ? 'bg-red-500' : 'bg-primary'
          )}
          style={{ width: `${storageUsagePercent}%` }}
        />
      </div>

      {isWarning && (
        <p className='mt-1 text-xs font-semibold text-red-500'>{t('considerRegister')}</p>
      )}
    </div>
  )
}
