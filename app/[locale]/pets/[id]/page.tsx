import { getTranslations } from 'next-intl/server'

interface IPetDetailsPageProps {
  params: Promise<{ id: string; locale: string }>
}

// TODO: delete when db will be ready
const MAX = {
  id: '124',
  name: 'Max',
  type: 'CAT',
  gender: 'male' as const,
  avatarUrl: '/image2.png',
  createdAt: new Date(),
  updatedAt: new Date(),
}

export default async function PetDetailsPage({ params }: IPetDetailsPageProps) {
  await params
  const t = await getTranslations('petDetailsPage')
  const { name: petName } = MAX

  return (
    <section id='pet-details'>
      <h1>{t('title', { petName })}</h1>
    </section>
  )
}
