'use client'

import { Modal } from '@/components/ui/Modal'
import { usePetStore } from '@/entities/pet/pet.store'
import { useTranslations } from 'next-intl'

import { AddPetForm } from '../AddPetForm/AddPetForm'

export const AddPetModal = () => {
  const t = useTranslations('modals.addPet')

  const { isAddPetModalOpen, closeAddModal } = usePetStore()

  return (
    <Modal isOpen={isAddPetModalOpen} onClose={closeAddModal} title={t('label')}>
      <div className='max-h-[80vh] overflow-y-auto px-1'>
        <AddPetForm onAfterSubmit={closeAddModal} />
      </div>
    </Modal>
  )
}
