'use client'

import { PlusIcon } from '@/components/icons/PlusIcon'
import { PetsList } from '@/components/PetsList'
import { AppButton } from '@/components/ui/AppButton'
import { useTranslations } from 'next-intl'

export default function PetsPage() {
  const t = useTranslations('common')
  return (
    <section className='flex flex-col gap-5'>
      <AppButton
        label={t('add')}
        icon={<PlusIcon className='w-4 stroke-2' />}
        className='max-w-fit self-end'
      />
      <PetsList />
    </section>
  )
}
