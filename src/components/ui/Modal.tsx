'use client'

import { ReactNode, useEffect, useRef } from 'react'

import { PlusIcon } from '@/components/icons'
import { useClickOutside } from '@/shared/hooks/useClickOutside'
import { createPortal } from 'react-dom'

export interface IModalProps {
  title: string
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

export const Modal = ({ title, children, isOpen, onClose }: IModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  useClickOutside(contentRef, onClose)

  if (!isOpen) return null

  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm'>
      <div
        ref={contentRef}
        className='w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl'
      >
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold'>{title}</h2>
          <button onClick={onClose} className='rounded-full p-1 hover:bg-gray-100'>
            <PlusIcon className='h-6 w-6 rotate-45' />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  )
}
