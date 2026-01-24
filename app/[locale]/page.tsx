import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export default async function HomePage() {
  const t = await getTranslations('common')
  return (
    <section
      id='home'
      className='flex flex-col items-center justify-center font-sans md:mt-5'
    >
      <div className='overflow-hidden rounded-full'>
        <Image src='/Promo1.svg' alt='logo' width={500} height={300} />
      </div>
      <h1 className='text-3xl'>{t('title')}</h1>
      <p className='mt-5'>{t('description')}</p>
    </section>
  )
}
