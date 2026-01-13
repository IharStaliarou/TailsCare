import { getDictionary } from '@/i18n/get-dictionary'
import { TLocale } from '@/i18n/types'

interface IHomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: IHomePageProps) {
  const { locale } = await params
  const messages = await getDictionary(locale as TLocale)

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <h1 className='text-3xl'>{messages.HomePage.title}</h1>
      <p className='mt-5'>{messages.HomePage.description}</p>
    </div>
  )
}
