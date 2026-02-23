'use client'

import { useEffect, useRef, useState } from 'react'

import { DropdownArrowIcon } from '@/components/icons'
import clsx from 'clsx'

export interface ISelectOption {
  label: string
  value: string
}

export interface ISelectProps {
  label?: string
  options: ISelectOption[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  className?: string
}

export const Select = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select option',
  error,
  className,
}: ISelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={clsx('flex w-full flex-col gap-1.5', className)} ref={containerRef}>
      {label && <label className='text-sm font-medium text-gray-600'>{label}</label>}

      <div className='relative'>
        <button
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            'flex w-full cursor-pointer items-center justify-between rounded-lg border px-4 py-3 text-sm transition-all focus:outline-none',
            isOpen ? 'border-primary ring-primary ring-1' : 'border-gray-600',
            error && 'border-red-500',
            !selectedOption && 'text-gray-600'
          )}
        >
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
          <DropdownArrowIcon
            className={clsx(
              'h-6 w-6 transition-transform duration-300',
              isOpen ? 'rotate-180' : ''
            )}
          />
        </button>

        {isOpen && (
          <ul className='absolute z-50 w-full overflow-auto rounded-lg border border-gray-900 p-1 shadow-md'>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={clsx(
                  'hover:bg-secondary cursor-pointer rounded-lg px-4 py-2 text-sm transition-colors hover:text-white',
                  option.value === value && 'text-secondary bg-secondary-active'
                )}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <span className='ml-1 text-xs text-red-500'>{error}</span>}
    </div>
  )
}
