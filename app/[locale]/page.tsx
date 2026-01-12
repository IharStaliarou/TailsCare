import { getMessages } from 'next-intl/server'

export default async function HomePage() {
  const messages = await getMessages()

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <h1 className='text-3xl'>{messages.HomePage.title}</h1>
      <p className='mt-5'>{messages.HomePage.description}</p>
    </div>
  )
}
