import { PetsList } from '@/components/features'
import { AddPetButton } from '@/components/features/AddPetButton'
import { LocalStorageVisualizer } from '@/components/features/LocalStorageVisualizer'

export default async function PetsPage() {
  return (
    <section className='flex flex-col gap-5'>
      <div className='flex flex-col justify-between gap-2.5 md:flex-row'>
        <LocalStorageVisualizer />
        <AddPetButton />
      </div>
      <PetsList />
    </section>
  )
}
