'use client'

import { ChangeEvent, useRef, useState } from 'react'

import clsx from 'clsx'
import Image from 'next/image'

import { AppButton } from '../ui/AppButton'
import { CameraIcon, PlusIcon } from './icons'

interface IImageUploaderProps {
  label: string
  placeholder?: string
  value?: string | null
  error?: string
  required?: boolean
  className?: string
  onChange: (file: File | null) => void
}

export function ImageUploader({
  label,
  placeholder,
  required = false,
  onChange,
  value,
  error,
  className,
}: IImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(value || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
      onChange(file)
    }
  }

  const handleRemoveImage = () => {
    setPreview(null)
    onChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div
      className={clsx(`flex flex-col items-center gap-1.5`, !preview && 'md:pb-13.75')}
    >
      <div
        onClick={() => fileInputRef.current?.click()}
        className={clsx(
          'relative flex h-150 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed transition-all md:h-full',
          preview
            ? 'mb-2.5 border-none shadow-md'
            : 'hover:border-secondary border-gray-600',
          error && 'border-red-500',
          className
        )}
      >
        {preview ? (
          <Image src={preview} alt='Preview' fill className='object-cover' />
        ) : (
          <div className='flex w-full flex-col items-center'>
            <h3 className='text-sm font-bold'>
              {label} {required && <span className='text-red-500'> *</span>}
            </h3>
            <CameraIcon className='h-25 w-25' />
            <p className='mt-1 w-1/2 text-center text-xs font-semibold uppercase'>
              {placeholder}
            </p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleFileChange}
        />
      </div>

      <div
        className={clsx(
          'flex items-center gap-5 self-start md:block',
          !preview && 'hidden'
        )}
      >
        {preview && (
          <AppButton
            variant='outline'
            className={'h-11.25'}
            onClick={handleRemoveImage}
            icon={<PlusIcon className='h-full w-full rotate-45 text-red-500' />}
          />
        )}
        {error && <span className='text-sm text-red-500'>{error}</span>}
      </div>
    </div>
  )
}
