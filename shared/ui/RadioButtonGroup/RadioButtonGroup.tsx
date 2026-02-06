'use client'

import { getRadioButtonClasses, getRadioButtonLabelClasses } from './styles'

interface IOption<T extends string> {
  label: string
  value: T
  description?: string
}

interface IRadioButtonGroupProps<T extends string> {
  label: string
  name: string
  options: IOption<T>[]
  selectedValue?: T
  error?: string
  onChange: (value: T) => void
}

export function RadioButtonGroup<T extends string>({
  label,
  name,
  options,
  selectedValue,
  onChange,
  error,
}: IRadioButtonGroupProps<T>) {
  const buttons = options.map((option) => {
    const isChecked = selectedValue === option.value
    return (
      <label key={option.value} className={getRadioButtonLabelClasses()}>
        <input
          type='radio'
          name={name}
          value={option.value}
          checked={selectedValue === option.value}
          onChange={() => onChange(option.value)}
          className={getRadioButtonClasses(isChecked)}
        />
        <span className='leading-sm justify-start text-sm'>
          {option.label} {option.description && `(${option.description})`}
        </span>
      </label>
    )
  })
  return (
    <div className='w-full self-stretch'>
      <p className='leading-sm mb-2.5 w-full text-base'>{label}</p>
      <div className={'inline-flex flex-col gap-3'}>{buttons}</div>
      {error && <p className='pt-1 text-xs text-red-500'>{error}</p>}
    </div>
  )
}
