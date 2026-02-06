import clsx from 'clsx'

interface IDividerProps {
  height?: number
  className?: string
}

export const Divider = ({ height, className }: IDividerProps) => {
  return (
    <div
      className={clsx(`w-full rounded-md bg-gray-900`, className)}
      style={{ height: height ? `${height}px` : '1px' }}
    />
  )
}
