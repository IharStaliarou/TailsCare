import { IIconsProps } from '@/shared/ui/icons'

export const PlusIcon = ({ className }: IIconsProps) => {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M4 12L12 12M12 12L20 12M12 12V4M12 12L12 20'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
