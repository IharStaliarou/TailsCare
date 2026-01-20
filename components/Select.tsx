'use client'

import { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'

import { DropdownArrowIcon } from './icons/DropdownArrowIcon'

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
      {label && (
        <label className='ml-1 text-sm font-medium text-zinc-700 dark:text-zinc-300'>
          {label}
        </label>
      )}

      <div className='relative'>
        <button
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            'flex w-full items-center justify-between rounded-lg border px-4 py-2.5 text-sm transition-all focus:outline-none',
            isOpen
              ? 'border-orange-500 ring-1 ring-orange-500'
              : 'border-zinc-800 dark:border-zinc-700',
            error && 'border-red-500',
            !selectedOption && 'text-zinc-500'
          )}
        >
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
          <DropdownArrowIcon
            className={clsx(
              'h-6 w-6 transition-transform duration-200',
              isOpen ? 'rotate-180' : ''
            )}
          />
        </button>

        {isOpen && (
          <ul className='absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-zinc-800 bg-white py-1 shadow-xl dark:border-zinc-700 dark:bg-zinc-900'>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={clsx(
                  'cursor-pointer px-4 py-2 text-sm transition-colors hover:bg-orange-500 hover:text-white',
                  option.value === value &&
                    'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-500'
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
