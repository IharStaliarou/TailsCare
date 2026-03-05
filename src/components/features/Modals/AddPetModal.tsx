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
      <div className='scrollbar-hide max-h-[80vh] overflow-scroll px-1'>
        <AddPetForm onAfterSubmit={closeAddModal} />
      </div>
    </Modal>
  )
}
