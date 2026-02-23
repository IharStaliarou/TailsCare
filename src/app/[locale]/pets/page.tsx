import { PetsList } from '@/components/features'
import { PlusIcon } from '@/components/icons'
import { AppButton } from '@/components/ui'
import { IPet } from '@/entities/pet/pet.types'
import { ROUTES } from '@/shared/config/routes'
import { getTranslations } from 'next-intl/server'

// TODO: delete when db will be ready
const PETS: IPet[] = [
  {
    id: '123',
    name: 'Charlie',
    type: 'DOG',
    breed: 'Golden Retriever',
    weight: 10,
    gender: 'male',
    avatarUrl: '/image1.png',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '124',
    name: 'Max',
    type: 'CAT',
    breed: 'Persian',
    weight: 5,
    gender: 'male',
    avatarUrl: '/image2.png',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
export default async function PetsPage() {
  const t = await getTranslations('common')
  return (
    <section className='flex flex-col gap-5'>
      <AppButton
        to={ROUTES.addPet}
        label={t('add')}
        icon={<PlusIcon className='w-4 stroke-2' />}
        className='max-w-fit self-end'
      />
      <PetsList pets={PETS} />
    </section>
  )
}
