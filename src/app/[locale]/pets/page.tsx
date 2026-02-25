import { PetsList } from '@/components/features'
import { PlusIcon } from '@/components/icons'
import { AppButton } from '@/components/ui'
import { ROUTES } from '@/shared/config/routes'
import { getTranslations } from 'next-intl/server'

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
      <PetsList />
    </section>
  )
}
