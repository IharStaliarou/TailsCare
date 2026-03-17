import { AddWeightForm } from '@/components/features/AddWeightForm/AddWeightForm'
import { PetDetailsCard } from '@/components/features/PetDetailsCard/PetDetailsCard'
import { WeightHistory } from '@/components/features/PetDetailsCard/WeightHistory'
import { AppButton } from '@/components/ui'
import { usePetStore } from '@/entities/pet/pet.store'
import { useNavigationActions } from '@/shared/hooks/useHandleBack'
import { useTranslations } from 'next-intl'

export default function PetDetailsPage() {
  const { handleBack } = useNavigationActions()
  const { _hasHydrated } = usePetStore()
  const tCommon = useTranslations('common')

  // TODO: add skeleton loader
  if (!_hasHydrated) return <div>Loading...</div>

  return (
    <section id='pet-details' className='flex flex-col gap-6 pb-10'>
      <AppButton
        onClick={handleBack}
        variant='outline'
        label={tCommon('back')}
        className='max-w-fit'
        title='Back'
      />

      <PetDetailsCard />
      <AddWeightForm />
      <WeightHistory />
    </section>
  )
}
