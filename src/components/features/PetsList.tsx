'use client'

import { usePetStore } from '@/entities/pet/pet.store'
import { IPet } from '@/entities/pet/pet.types'
import { ROUTES } from '@/shared/config/routes'
import { useTranslations } from 'next-intl'

import { AppButton } from '../ui'
import { EditPetModal } from './Modals/EditPetModal'
import { PetCard } from './PetCard'

export const PetsList = () => {
  const t = useTranslations('petsPage')

  const { pets, isEditModalOpen, editingPetId, closeEditModal, _hasHydrated } =
    usePetStore()

  // TODO: add skeleton loader
  if (!_hasHydrated) {
    return <div>Loading...</div>
  }

  if (pets.length === 0) {
    return (
      <div>
        <h2 className='text-center text-4xl'>{t('noPets')}</h2>
        <AppButton to={ROUTES.addPet} label='Add pet' />
      </div>
    )
  }

  return (
    <ul className='flex flex-col flex-wrap items-center gap-5 md:flex-row md:justify-evenly'>
      {pets.map((pet: IPet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
      <EditPetModal
        editPetId={editingPetId}
        isEditModalOpen={isEditModalOpen}
        onClose={closeEditModal}
      />
    </ul>
  )
}
