import { IIconsProps } from '@/interfaces/icons'

export const UserIcon = ({ className }: IIconsProps) => {
  return (
    <svg
      viewBox='0 0 24 24'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
    >
      <rect
        id='User Circle'
        width='24.000000'
        height='24.000000'
        x='0.000000'
        y='0.000000'
      />
      <path
        id='Vector 1'
        d='M7.03036 19.5047C7.27433 17.5293 8.95858 16 11 16L13 16C15.0414 16 16.7257 17.5293 16.9696 19.5047M12 3C16.9706 3 21 7.02944 21 12C21 15.1335 19.3986 17.893 16.9696 19.5047C15.5456 20.4496 13.8371 21 12 21C10.1629 21 8.45441 20.4496 7.03036 19.5047C4.60137 17.893 3 15.1335 3 12C3 7.02944 7.02944 3 12 3ZM12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10C15 11.6569 13.6569 13 12 13Z'
        fillRule='evenodd'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.500000'
      />
    </svg>
  )
}
