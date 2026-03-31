'use client'

import { useEffect } from 'react'

import { PetsList } from '@/components/features'
import { AddPetButton } from '@/components/features/AddPetButton'
import { LocalStorageVisualizer } from '@/components/features/LocalStorageVisualizer'
import { AddPetModal } from '@/components/features/Modals/AddPetModal'
import { EditPetModal } from '@/components/features/Modals/EditPetModal'
import { usePetStore } from '@/entities/pet/pet.store'
import { useSearchParams } from 'next/navigation'

export default function PetsPage() {
  const searchParams = useSearchParams()
  const { openAddPetModal } = usePetStore()

  useEffect(() => {
    if (searchParams.get('add') === 'true') {
      openAddPetModal()
    }
  }, [searchParams, openAddPetModal])

  return (
    <section className='flex flex-col gap-5'>
      <div className='flex flex-col justify-between gap-2.5 md:flex-row'>
        <LocalStorageVisualizer />
        <AddPetButton />
      </div>
      <PetsList />
      <AddPetModal />
      <EditPetModal />
    </section>
  )
}
