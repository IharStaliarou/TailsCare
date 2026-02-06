'use client'

import { ChangeEvent, InputHTMLAttributes, ReactNode, useRef } from 'react'

import clsx from 'clsx'

const VALID_NUMBER_REGEX = /^(?![,.])\d*([.,]\d*)?$/

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: ReactNode
  containerClassName?: string
  customDatePlaceholder?: string
}

export const Input = ({
  label,
  value,
  error,
  type = 'text',
  onChange,
  icon,
  className,
  containerClassName,
  placeholder,
  id,
  ...props
}: IInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const hasError = !!error

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    if (typeof type === 'number') {
      if (
        newValue !== '' &&
        (newValue.includes(' ') || !VALID_NUMBER_REGEX.test(newValue))
      ) {
        return
      }
    }

    onChange?.(e)
  }

  return (
    <div className={clsx('flex w-full flex-col gap-1.5', containerClassName)}>
      {label && (
        <label htmlFor={id} className='text-sm font-medium'>
          {label}
        </label>
      )}

      <div className='relative flex items-center'>
        {icon && <div className='absolute left-3 text-gray-600'>{icon}</div>}

        <input
          id={id}
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          type={type}
          placeholder={placeholder}
          className={clsx(
            'w-full rounded-lg border px-4 py-3 text-sm transition-all focus:outline-none',
            'placeholder:text-gray-300 disabled:cursor-not-allowed disabled:opacity-50',
            icon && 'pl-10',
            hasError
              ? 'border-red-500 focus:ring-1 focus:ring-red-500'
              : 'focus:border-primary focus:ring-primary border-gray-600 focus:ring-1',
            className
          )}
          {...props}
        />
      </div>

      {hasError && <span className='text-xs text-red-500'>{error}</span>}
    </div>
  )
}
