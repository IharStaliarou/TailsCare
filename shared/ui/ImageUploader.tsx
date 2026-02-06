'use client'

import { ChangeEvent, useRef, useState } from 'react'

import clsx from 'clsx'
import Image from 'next/image'

interface IImageUploadProps {
  value?: string | null
  error?: string
  onChange: (file: File | null) => void
}

export function ImageUpload({ onChange, value, error }: IImageUploadProps) {
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
    <div className='flex flex-col items-center gap-4'>
      <div
        onClick={() => fileInputRef.current?.click()}
        className={clsx(
          'relative flex h-80 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed transition-all md:h-full',
          preview ? 'border-none shadow-md' : 'hover:border-secondary border-gray-600',
          error && 'border-red-500'
        )}
      >
        {preview ? (
          <Image src={preview} alt='Preview' fill className='object-cover' />
        ) : (
          <div className='flex flex-col items-center'>
            icon camera
            <span className='mt-1 text-[10px] font-medium uppercase'>Add Photo</span>
          </div>
        )}
      </div>

      {preview && (
        <button
          type='button'
          onClick={handleRemoveImage}
          className='flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-400'
        >
          icon cross Remove
        </button>
      )}

      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleFileChange}
      />
      {error && <span className='text-xs text-red-500'>{error}</span>}
    </div>
  )
}
