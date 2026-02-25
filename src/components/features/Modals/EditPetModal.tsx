'use client'

import { Modal } from '@/components/ui/Modal'
import { usePetStore } from '@/entities/pet/pet.store'
import { useTranslations } from 'next-intl'

import { AddPetForm } from '../AddPetForm/AddPetForm'

interface IEditPetModalProps {
  editPetId: string | null
  isEditModalOpen: boolean
  onClose: () => void
  className?: string
}

export const EditPetModal = ({
  editPetId,
  isEditModalOpen,
  onClose,
  className,
}: IEditPetModalProps) => {
  const t = useTranslations('modals.editPet')
  const { pets } = usePetStore()

  const petToEdit = pets.find((pet) => pet.id === editPetId)

  if (!petToEdit) return null

  return (
    <Modal
      isOpen={isEditModalOpen}
      onClose={onClose}
      title={t('label')}
      className={className}
    >
      <div className='max-h-[80vh] overflow-y-auto px-1'>
        <AddPetForm initialPetData={petToEdit} onAfterSubmit={onClose} />
      </div>
    </Modal>
  )
}
