'use client'

import { Modal } from '@/components/ui/Modal'
import { usePetStore } from '@/entities/pet/pet.store'
import { useTranslations } from 'next-intl'

import { AddPetForm } from '../AddPetForm/AddPetForm'

interface IEditPetModalProps {
  className?: string
}

export const EditPetModal = ({ className }: IEditPetModalProps) => {
  const t = useTranslations('modals.editPet')
  const { isEditModalOpen, closeEditModal, editingPetId } = usePetStore()
  const petToEdit = usePetStore((state) =>
    state.pets.find((pet) => pet.id === editingPetId)
  )

  if (!petToEdit) return null

  return (
    <Modal
      isOpen={isEditModalOpen}
      onClose={closeEditModal}
      title={t('label')}
      className={className}
    >
      <div className='scrollbar-hide max-h-[80vh] overflow-scroll px-1'>
        <AddPetForm initialPetData={petToEdit} onAfterSubmit={closeEditModal} />
      </div>
    </Modal>
  )
}
