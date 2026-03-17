'use client'

import { AddWeightForm } from '@/components/features/AddWeightForm/AddWeightForm'
import { PetDetailsCard } from '@/components/features/PetDetailsCard/PetDetailsCard'
import { WeightHistory } from '@/components/features/PetDetailsCard/WeightHistory'
import { AppButton } from '@/components/ui'
import { usePetStore } from '@/entities/pet/pet.store'
import { useNavigationActions } from '@/shared/hooks/useHandleBack'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

export default function PetDetailsPage() {
  const { handleBack } = useNavigationActions()
  const { id } = useParams()
  const { pets, _hasHydrated } = usePetStore()
  const t = useTranslations('forms.pet')
  const tCommon = useTranslations('common')

  const pet = pets.find((pet) => pet.id === id)

  // TODO: add skeleton loader
  if (!_hasHydrated) return <div>Loading...</div>
  if (!pet) return <div>{t('notFound')}</div>

  return (
    <section id='pet-details' className='flex flex-col gap-6 pb-10'>
      <AppButton
        onClick={handleBack}
        variant='outline'
        label={tCommon('back')}
        className='max-w-fit'
        title='Back'
      />

      <PetDetailsCard />
      <AddWeightForm />
      <WeightHistory />
    </section>
  )
}
