import { ComponentType } from 'react'

export type TNavigationKey = 'home' | 'pets' | 'addPet' | 'calendar' | 'notifications'
export type TNavigationLink = {
  label: TNavigationKey
  href: string
  icon: ComponentType<{ className?: string }>
}
