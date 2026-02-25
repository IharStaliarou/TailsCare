import { AppButton } from '@/components/ui'
import { Modal } from '@/components/ui/Modal'
import { IPet } from '@/entities/pet/pet.types'
import { useTranslations } from 'next-intl'

interface IDeletePetModalProps {
  isDeleteModalOpen: boolean
  pet: IPet
  setIsDeleteModalOpen: (value: boolean) => void
  handleDelete: () => void
}

const DeletePetModal = ({
  isDeleteModalOpen,
  pet,
  setIsDeleteModalOpen,
  handleDelete,
}: IDeletePetModalProps) => {
  const t = useTranslations('modals.deletePet')

  const { name } = pet

  return (
    <Modal
      isOpen={isDeleteModalOpen}
      onClose={() => setIsDeleteModalOpen(false)}
      title={t('title')}
    >
      <div className='space-y-6'>
        <p className='lineBreak text-center text-gray-900'>
          {t('description', { petName: name })}
        </p>
        <div className='flex gap-4'>
          <AppButton
            variant='outline'
            label={t('cancel')}
            className='flex-1'
            onClick={() => setIsDeleteModalOpen(false)}
          />
          <AppButton
            label={t('delete')}
            className='flex-1 bg-red-500 text-white hover:bg-red-600'
            onClick={handleDelete}
          />
        </div>
      </div>
    </Modal>
  )
}

export default DeletePetModal
