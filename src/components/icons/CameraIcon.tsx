import { IIconsProps } from './types'

export const CameraIcon = ({ className }: IIconsProps) => {
  return (
    <svg
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      className={className}
    >
      <rect id='Photo Camera' x='0.000000' y='0.000000' />
      <path
        id='Rectangle 111'
        d='M21 18C21 19.1046 20.1046 20 19 20L5 20C3.89543 20 3 19.1046 3 18L3 9C3 7.89543 3.89543 7 5 7L6.5 7C7.12951 7 7.72229 6.70361 8.1 6.2L9.15 4.8C9.52771 4.29639 10.1205 4 10.75 4L13.25 4C13.8795 4 14.4723 4.29639 14.85 4.8L15.9 6.2C16.2777 6.70361 16.8705 7 17.5 7L19 7C20.1046 7 21 7.89543 21 9L21 18Z'
        fillRule='nonzero'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.500000'
      />
      <circle
        id='Ellipse 130'
        cx='12'
        cy='13'
        r='4'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.500000'
      />
    </svg>
  )
}
