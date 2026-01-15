import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('common')
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <h1 className='text-3xl'>{t('title')}</h1>
      <p className='mt-5'>{t('description')}</p>
    </div>
  )
}
