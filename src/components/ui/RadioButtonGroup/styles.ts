export const getRadioButtonLabelClasses = (): string => {
  return 'flex cursor-pointer items-center gap-3 rounded-lg'
}

export const getRadioButtonClasses = (isChecked: boolean): string => {
  const baseAndBeforeClasses = `
    grid h-6 min-w-6 appearance-none place-content-center 
    rounded-full cursor-pointer
    [&::before]:bg-primary 
    [&::before]:h-3 [&::before]:w-3 
    [&::before]:rounded-full [&::before]:content-['']
    [&::before]:scale-0 
    checked:[&::before]:scale-100 
    hover:[&::before]:scale-100 
    hover:[&::before]:bg-primary-dark 
    active:[&::before]:bg-primary-active 
    [&::before]:transition-all 
    [&::before]:duration-300 
    transition-colors
    `

  const borderClasses = isChecked
    ? 'border-primary-dark border-2'
    : 'border-primary border-[1.5px]'

  return `${baseAndBeforeClasses} ${borderClasses}`.trim()
}
