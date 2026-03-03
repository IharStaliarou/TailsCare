'use client'

import { usePetStore } from '@/entities/pet/pet.store'
import { IPet } from '@/entities/pet/pet.types'
import { useTranslations } from 'next-intl'

import { PetCard } from './PetCard'

export const PetsList = () => {
  const t = useTranslations('petsPage')

  const { pets, _hasHydrated } = usePetStore()

  // TODO: add skeleton loader
  if (!_hasHydrated) {
    return <div>Loading...</div>
  }

  if (pets.length === 0) {
    return (
      <>
        <h2 className='mt-5 text-center text-4xl'>{t('noPets')}</h2>
      </>
    )
  }

  return (
    <ul className='flex flex-col flex-wrap items-center gap-5 md:flex-row md:justify-evenly'>
      {pets.map((pet: IPet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </ul>
  )
}
