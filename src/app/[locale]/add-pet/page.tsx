import { AddPetForm } from '@/components/features'
import { getTranslations } from 'next-intl/server'

export default async function AddPetPage() {
  const tPage = await getTranslations('addPetPage')

  return (
    <section>
      <h1 className='text-3xl font-bold'>{tPage('label')}</h1>
      <div className='mt-5 flex flex-col gap-2.5'>
        <h2 className='text-md leading-md font-semibold'>{tPage('form.label')}</h2>
        <AddPetForm />
      </div>
    </section>
  )
}
