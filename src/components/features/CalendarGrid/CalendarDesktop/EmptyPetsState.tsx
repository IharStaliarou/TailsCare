'use client'

import { AppButton } from '@/components/ui'
import { useRouter } from '@/shared/config/i18n'
import { useTranslations } from 'next-intl'

export const EmptyPetsState = () => {
  const t = useTranslations('navigation')
  const tMessage = useTranslations('calendar')
  const router = useRouter()

  const handleAddPet = () => {
    router.push('/pets?add=true')
  }

  return (
    <div className='mt-25 flex min-h-160 flex-col items-center space-y-4'>
      <p className='w-3/4 text-center'>{tMessage('noPetsForCalendar')}</p>
      <AppButton label={t('addPet')} onClick={handleAddPet} className='h-12 text-white' />
    </div>
  )
}
