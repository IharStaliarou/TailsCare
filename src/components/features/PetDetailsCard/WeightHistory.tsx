'use client'

import { useTranslations } from 'next-intl'

import { PetWeightChart } from './PetWeightChart'

export const WeightHistory = () => {
  const t = useTranslations('forms.pet')

  return (
    <div className='flex min-h-100 flex-col gap-4 rounded-xl bg-white p-6 shadow-md'>
      <h2 className='text-2xl font-bold'>{t('weightHistory')}</h2>
      <PetWeightChart />
    </div>
  )
}
