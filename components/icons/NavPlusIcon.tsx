import { IIconsProps } from '@/interfaces/icons'

export const NavPlusIcon = ({ className }: IIconsProps) => {
  return (
    <svg
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      className={className}
    >
      <rect
        id='Add Circle'
        width='24.000000'
        height='24.000000'
        x='0.000000'
        y='0.000000'
      />
      <path
        id='Vector'
        d='M7 12L12 12L17 12M12 7L12 12M12 12L12 17'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.500000'
      />
      <circle
        id='Ellipse 131'
        cx='12'
        cy='12'
        r='9'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.500000'
      />
    </svg>
  )
}
