import { PlusIcon } from '@/components/icons/PlusIcon'
import { PetsList } from '@/components/PetsList'
import { AppButton } from '@/components/ui/AppButton'
import { IPet } from '@/interfaces/user'
import { getTranslations } from 'next-intl/server'

// TODO: delete when db will be ready
const PETS: IPet[] = [
  {
    id: '123',
    name: 'Charlie',
    type: 'DOG',
    gender: 'male',
    avatarUrl: '/image1.png',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '124',
    name: 'Max',
    type: 'CAT',
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
        label={t('add')}
        icon={<PlusIcon className='w-4 stroke-2' />}
        className='max-w-fit self-end'
      />
      <PetsList pets={PETS} />
    </section>
  )
}
