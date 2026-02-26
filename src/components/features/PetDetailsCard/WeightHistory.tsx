'use client'

import { useTranslations } from 'next-intl'

export const WeightHistory = () => {
  const t = useTranslations('forms.pet')
  return (
    <div className='flex min-h-100 flex-col gap-4 rounded-xl bg-white p-6 shadow-md'>
      <h2 className='text-2xl font-bold'>{t('weightHistory')}</h2>
      <div className='flex flex-1 items-center justify-center rounded-xl border-2 border-dashed border-gray-100'>
        <p className='text-gray-400'>[ Weight History ]</p>
      </div>
    </div>
  )
}
