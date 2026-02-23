import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export default async function HomePage() {
  const t = await getTranslations('common')
  return (
    <section
      id='home'
      className='flex min-h-[calc(100vh-9.75rem)] flex-col items-center justify-center font-sans'
    >
      <div className='overflow-hidden rounded-full'>
        <Image src='/Promo1.svg' alt='logo' width={500} height={300} />
      </div>
      <h1 className='text-3xl'>{t('title')}</h1>
      <p className='mt-5 text-center'>{t('description')}</p>
    </section>
  )
}
