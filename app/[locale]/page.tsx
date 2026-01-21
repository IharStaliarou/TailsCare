'use client'

import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('common')
  return (
    <div className='flex min-h-screen flex-col items-center justify-center font-sans'>
      <h1 className='text-3xl'>{t('title')}</h1>
      <p className='mt-5'>{t('description')}</p>
      <Input label='Email' />
      <Select
        label='Select option'
        value='1'
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ]}
        onChange={() => {}}
      />
    </div>
  )
}
