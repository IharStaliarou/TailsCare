import { IPet } from '@/interfaces/user'
import { getTranslations } from 'next-intl/server'

import { PetCard } from './PetCard'

interface IPetsListProps {
  pets: IPet[]
}

export const PetsList = async ({ pets }: IPetsListProps) => {
  const t = await getTranslations('petsPage')
  const tError = await getTranslations('error')

  if (pets.length === 0) {
    return <h2 className='text-center text-4xl'>{t('noPets')}</h2>
  }

  if (!Array.isArray(pets)) {
    return <h2 className='text-center text-4xl'>{tError('somethingError')}</h2>
  }

  return (
    <ul className='flex flex-col flex-wrap items-center gap-5 md:flex-row'>
      {pets.map((pet: IPet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </ul>
  )
}
