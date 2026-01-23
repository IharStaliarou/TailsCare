import { getTranslations } from 'next-intl/server'

export default async function HomePage() {
  const t = await getTranslations('common')
  return (
    <div className='flex min-h-screen flex-col items-center justify-center font-sans'>
      <h1 className='text-3xl'>{t('title')}</h1>
      <p className='mt-5'>{t('description')}</p>
    </div>
  )
}
