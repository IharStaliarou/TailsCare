'use client'

import { ReactNode, useEffect } from 'react'

import { PlusIcon } from '@/components/ui/icons'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'

import { AppButton } from './AppButton'

export interface IModalProps {
  title: string
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  className?: string
}

export const Modal = ({ title, children, isOpen, onClose, className }: IModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  const modalRoot =
    typeof document !== 'undefined'
      ? document.getElementById('modal-root') || document.body
      : null

  if (!modalRoot) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-end justify-center sm:items-center'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 bg-black/40 backdrop-blur-[2px]'
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '15%' }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={clsx(
              'relative z-50 w-full bg-white shadow-2xl',
              'h-[85vh] rounded-t-4xl',
              'sm:h-auto sm:max-w-lg sm:translate-y-0 sm:rounded-2xl',
              className
            )}
            drag='y'
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) onClose()
            }}
          >
            <div className='flex justify-center pt-3 pb-1 sm:hidden'>
              <div className='h-1.5 w-12 rounded-full bg-gray-600' />
            </div>

            <div className='flex h-full flex-col p-6 pt-2'>
              <div className='flex items-center justify-between pb-6'>
                <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
                  {title}
                </h2>
                <AppButton onClick={onClose} className='rounded-full'>
                  <PlusIcon className='h-6 w-6 rotate-45 text-white' />
                </AppButton>
              </div>

              <div className='scrollbar-hide flex-1 overflow-y-auto pb-10'>
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    modalRoot
  )
}
