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
          <label
            htmlFor={id}
            className='ml-1 text-sm font-medium text-zinc-700 dark:text-zinc-300'
          >
            {label}
          </label>
        )}

        <div className='relative flex items-center'>
          {icon && <div className='absolute left-3 text-zinc-500'>{icon}</div>}

          <input
            id={id}
            ref={ref}
            className={clsx(
              'w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm transition-all focus:outline-none',
              'placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50',
              icon && 'pl-10',
              hasError
                ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-zinc-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 dark:border-zinc-700',
              className
            )}
            {...props}
          />
        </div>

        {hasError && <span className='ml-1 text-xs text-red-500'>{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
