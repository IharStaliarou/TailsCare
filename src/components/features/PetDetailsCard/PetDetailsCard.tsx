import { DEFAULT_PET_AVATAR } from '@/entities/pet/pet.constants'
import { IPet } from '@/entities/pet/pet.types'
import { formatAge } from '@/entities/pet/pet.utils'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { CardInfoBlock } from './CardInfoBlock'

interface IPetDetailsCardProps {
  pet: IPet
}

export const PetDetailsCard = ({ pet }: IPetDetailsCardProps) => {
  const t = useTranslations('forms.pet')
  const tAge = useTranslations('petDetailsPage.age')

  const { name, avatar, type, breed, currentWeight, targetWeight, birthday } = pet
  const ageString = formatAge(birthday, tAge)

  return (
    <div className='grid grid-cols-1 gap-6 rounded-xl bg-white p-6 shadow-md md:grid-cols-3'>
      <div className='relative h-60 min-h-60 w-full md:h-full'>
        <Image
          src={avatar || DEFAULT_PET_AVATAR[type]}
          alt={name}
          fill
          className='rounded-md object-cover'
        />
      </div>

      <div className='flex flex-col justify-between gap-4 md:col-span-2'>
        <div>
          <h1 className='text-4xl font-bold text-gray-900'>{name}</h1>
          <p className='text-lg text-gray-500'>
            {t('breed.label')}: {breed}
          </p>
        </div>

        <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
          {/* TODO: resolve weight type conflict */}
          <CardInfoBlock
            label={t('currentWeight.label')}
            value={currentWeight!.toString()}
          />
          <CardInfoBlock
            label={t('targetWeight.label')}
            value={targetWeight ? targetWeight.toString() : '-'}
          />
          <CardInfoBlock label={t('birthday.age')} value={ageString} />
          <CardInfoBlock label={t('type.label')} value={t(`type.options.${type}`)} />
        </div>
      </div>
    </div>
  )
}
