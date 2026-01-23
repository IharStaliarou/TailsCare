import { IPet } from '@/interfaces/user'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import { EditIcon } from './icons/EditIcon'
import { TrashIcon } from './icons/TrashIcon'
import { AppButton } from './ui/AppButton'

interface IPetCardProps {
  pet: IPet
}

export const PetCard = async ({ pet }: IPetCardProps) => {
  const t = await getTranslations('common')
  const { name, avatarUrl } = pet
  return (
    <li className='flex w-80 flex-col items-center gap-2.5 rounded-lg p-4 shadow-xl'>
      <div className='relative h-75 w-full'>
        <Image src={avatarUrl} alt={name} fill className='rounded-md object-cover' />
      </div>
      <h3 className='self-start text-xl'>{name}</h3>
      <div className='flex w-full justify-start gap-2.5'>
        <AppButton
          variant='icon'
          icon={<TrashIcon className='h-6 w-6 stroke-2 text-white' />}
          className='w-12 bg-red-500 hover:bg-red-700 active:bg-red-300'
        />
        <AppButton
          to={`/pets/${pet.id}`}
          variant='icon'
          icon={<EditIcon className='w-6 stroke-2' />}
          className='w-12 bg-yellow-200'
        />
        <AppButton label={t('details')} to={`/pets/${pet.id}`} className='grow' />
      </div>
    </li>
  )
}
