import { ComponentType } from 'react'

export type TNavigationKey = 'home' | 'pets' | 'calendar' | 'notifications'
export type TNavigationLink = {
  label: TNavigationKey
  href: string
  icon: ComponentType<{ className?: string }>
}
