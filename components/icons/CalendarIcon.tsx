import { IIconsProps } from '@/interfaces/icons'

export const CalendarIcon = ({ className }: IIconsProps) => {
  return (
    <svg
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
    >
      <rect
        id='Calendar Today'
        width='24.000000'
        height='24.000000'
        x='0.000000'
        y='0.000000'
      />
      <path
        id='Rectangle 47'
        d='M18 5C19.1046 5 20 5.89543 20 7L20 10L20 19C20 20.1046 19.1046 21 18 21L6 21C4.89543 21 4 20.1046 4 19L4 10L4 7C4 5.89543 4.89543 5 6 5L18 5ZM20 10L4 10M8 3L8 7M16 3C16 3 16 5.4379 16 7'
        fillRule='nonzero'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='1.500000'
      />
      <rect
        id='Rectangle 48'
        width='5.000000'
        height='5.000000'
        x='6.000000'
        y='12.000000'
        rx='1.000000'
        fill='currentColor'
      />
    </svg>
  )
}
