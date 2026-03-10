import { IIconsProps } from './types'

export const HelpIcon = ({ className }: IIconsProps) => {
  return (
    <svg
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
    >
      <rect
        id='Help Question'
        width='24.000000'
        height='24.000000'
        x='0.000000'
        y='0.000000'
      />
      <path
        id='Ellipse 29'
        d='M10 9C10 8.60444 10.1173 8.21776 10.3371 7.88886C10.5568 7.55996 10.8692 7.30362 11.2346 7.15224C11.6001 7.00087 12.0022 6.96126 12.3902 7.03843C12.7781 7.1156 13.1345 7.30608 13.4142 7.58579C13.6939 7.86549 13.8844 8.22186 13.9616 8.60982C14.0387 8.99778 13.9991 9.39992 13.8478 9.76537C13.6964 10.1308 13.44 10.4432 13.1111 10.6629C12.7822 10.8827 12.3956 11 12 11L12 12M17 3C19.2091 3 21 4.79086 21 7L21 15C21 17.2091 19.2091 19 17 19L14.25 19L12.8 20.9333C12.4 21.4667 11.6 21.4667 11.2 20.9333L9.75 19L7 19C4.79086 19 3 17.2091 3 15L3 7C3 4.79086 4.79086 3 7 3L17 3Z'
        fillRule='evenodd'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.500000'
      />
      <circle id='Ellipse 30' cx='12' cy='15' r='1' fill='currentColor' />
    </svg>
  )
}
