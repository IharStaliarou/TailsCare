import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

import clsx from 'clsx'

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: ReactNode
  containerClassName?: string
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, error, icon, className, containerClassName, id, ...props }, ref) => {
    const hasError = !!error

    return (
      <div className={clsx('flex w-full flex-col gap-1.5', containerClassName)}>
        {label && (
          <label htmlFor={id} className='text-sm font-medium text-gray-600'>
            {label}
          </label>
        )}

        <div className='relative flex items-center'>
          {icon && <div className='absolute left-3 text-gray-600'>{icon}</div>}

          <input
            id={id}
            ref={ref}
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
)

Input.displayName = 'Input'
