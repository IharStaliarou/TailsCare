import { IPet } from '@/entities/pet'
import { ROUTES } from '@/shared/config/routes'
import { AppButton } from '@/shared/ui'
import { EditIcon, TrashIcon } from '@/shared/ui/icons'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

interface IPetCardProps {
  pet: IPet
}

export const PetCard = async ({ pet }: IPetCardProps) => {
  const t = await getTranslations('common')
  const { name, avatarUrl, breed, weight } = pet
  return (
    <li className='flex h-25 w-full justify-between gap-2.5 rounded-lg p-4 shadow-xl md:h-auto md:w-80 md:flex-col md:justify-start'>
      <div className='flex gap-2.5 md:flex-col'>
        <div className='relative w-17 md:h-75 md:w-full'>
          <Image
            src={avatarUrl}
            alt={name}
            fill
            className='rounded-full object-cover md:rounded-md'
          />
        </div>
        <div className='flex flex-col justify-center'>
          <h3 className='text-xl font-bold'>{name}</h3>
          <div className='flex justify-between'>
            <p className='font-semibold'>{breed}</p>
            <span className='font-bold'>{`${weight} ${t('kg')}`}</span>
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
          to={`/pets/${pet.id}`}
          variant='icon'
          icon={<EditIcon className='w-6 stroke-2 text-white' />}
          className='w-12 bg-yellow-300 hover:bg-yellow-600 active:bg-yellow-200'
        />
        <AppButton
          variant='icon'
          icon={<TrashIcon className='h-6 w-6 stroke-2 text-white' />}
          className='w-12 bg-red-500 hover:bg-red-700 active:bg-red-300'
        />
      </div>
    </li>
  )
}
