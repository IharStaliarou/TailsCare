'use client'

import { useState } from 'react'

import { EditIcon, TrashIcon } from '@/components/icons'
import { AppButton } from '@/components/ui'
import { DEFAULT_PET_AVATAR } from '@/entities/pet/pet.constants'
import { usePetStore } from '@/entities/pet/pet.store'
import { IPet } from '@/entities/pet/pet.types'
import { ROUTES } from '@/shared/config/routes'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import DeletePetModal from './Modals/DeletePetModal'

interface IPetCardProps {
  pet: IPet
}

export const PetCard = ({ pet }: IPetCardProps) => {
  const t = useTranslations('common')

  const { id: petId, name, avatar, breed, currentWeight, type } = pet
  const { openEditModal, removePet } = usePetStore()

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleDeletePet = () => {
    removePet(petId)
    setIsDeleteModalOpen(false)
  }

  return (
    <>
      <li className='flex h-25 w-full justify-between gap-2.5 rounded-lg p-4 shadow-xl md:h-auto md:w-80 md:flex-col md:justify-start'>
        <div className='flex gap-2.5 md:flex-col'>
          <div className='relative w-17 md:h-75 md:w-full'>
            <Image
              src={avatar || DEFAULT_PET_AVATAR[type]}
              alt={name}
              fill
              className='rounded-full object-cover md:rounded-md'
            />
          </div>
          <div className='flex flex-col justify-center'>
            <h3 className='text-xl font-bold'>{name}</h3>
            <div className='flex gap-2.5 md:justify-between md:gap-0'>
              <p className='font-semibold'>{breed}</p>
              <span className='font-bold'>{`${currentWeight} ${t('kg')}`}</span>
            </div>
          </div>
        </div>

        <div className='my-auto flex h-12 w-auto gap-2.5 md:mx-0 md:w-full'>
          <AppButton
            label={t('details')}
            to={ROUTES.petDetails}
            className='hidden grow md:flex'
          />
          <AppButton
            variant='icon'
            icon={<EditIcon className='w-6 stroke-2 text-white' />}
            onClick={() => openEditModal(pet.id)}
            className='w-12 bg-yellow-300 hover:bg-yellow-600 active:bg-yellow-200'
          />
          <AppButton
            variant='icon'
            icon={<TrashIcon className='h-6 w-6 stroke-2 text-white' />}
            onClick={() => setIsDeleteModalOpen(true)}
            className='w-12 bg-red-500 hover:bg-red-700 active:bg-red-300'
          />
        </div>
      </li>
      <DeletePetModal
        isDeleteModalOpen={isDeleteModalOpen}
        pet={pet}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        handleDelete={handleDeletePet}
      />
    </>
  )
}
