interface IInfoBlockProps {
  label: string
  value: string
}

export const CardInfoBlock = ({ label, value }: IInfoBlockProps) => (
  <div className='flex flex-col gap-1'>
    <span className='text-xs font-bold tracking-wider text-gray-600 uppercase'>
      {label}
    </span>
    <span className='text-lg font-semibold text-gray-900'>{value}</span>
  </div>
)
