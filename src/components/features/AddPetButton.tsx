'use client'

import { usePetStore } from '@/entities/pet/pet.store'
import { useTranslations } from 'next-intl'

import { PlusIcon } from '../icons'
import { AppButton } from '../ui'

export const AddPetButton = () => {
  const t = useTranslations('common')

  const { openAddPetModal } = usePetStore()

  return (
    <AppButton
      label={t('add')}
      icon={<PlusIcon className='w-4 stroke-2' />}
      onClick={openAddPetModal}
      className='max-w-fit self-end md:self-auto'
    />
  )
}
