'use client'

import { Modal } from '@/components/ui/Modal'
import { useTranslations } from 'next-intl'

import { AddPetForm } from '../AddPetForm/AddPetForm'

interface IAddPetModalProps {
  isAddPetModalOpen: boolean
  onClose: () => void
}

export const AddPetModal = ({ isAddPetModalOpen, onClose }: IAddPetModalProps) => {
  const t = useTranslations('modals.addPet')

  return (
    <Modal isOpen={isAddPetModalOpen} onClose={onClose} title={t('label')}>
      <div className='max-h-[80vh] overflow-y-auto px-1'>
        <AddPetForm onAfterSubmit={onClose} />
      </div>
    </Modal>
  )
}
