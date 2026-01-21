import clsx from 'clsx'

interface IBurgerButtonProps {
  className?: string
  isMobileMenuOpen: boolean
  toggleMobileMenu: () => void
}

export const BurgerButton = ({
  isMobileMenuOpen,
  toggleMobileMenu,
  className,
}: IBurgerButtonProps) => {
  return (
    <button
      className={`z-50 p-2 md:hidden ${className}`}
      onClick={toggleMobileMenu}
      aria-label='Toggle navigation menu'
      aria-expanded={isMobileMenuOpen}
    >
      <div className='flex flex-col gap-1.5'>
        <span
          className={clsx(
            'h-0.5 bg-black transition-all',
            isMobileMenuOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'
          )}
        />
        <span
          className={clsx(
            'h-0.5 bg-black transition-all',
            isMobileMenuOpen ? 'w-0' : 'w-6'
          )}
        />
        <span
          className={clsx(
            'h-0.5 bg-black transition-all',
            isMobileMenuOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-6'
          )}
        />
      </div>
    </button>
  )
}
